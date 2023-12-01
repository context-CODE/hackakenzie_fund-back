import { Injectable } from '@nestjs/common';
import { StatusOrder } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { Order } from '../../entities/order.entity';
import { OrdersRepository } from '../orders.repository';
import { PrismaService } from 'src/database/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrderItemDto } from '../../dto/create-order-item.dto';
import { IProductsMail } from 'src/modules/mail-server/mail.interface';
import { DEFAULT_PAGINATION_SIZE } from 'src/common/util/common.constants';
import { MailServerService } from 'src/modules/mail-server/mail-server.service';
import { CreateShipmentDto } from 'src/modules/shipments/dto/create-shipment.dto';

@Injectable()
export class OrdersPrismaRepository implements OrdersRepository {
  constructor(
    private prisma: PrismaService,
    private readonly mailServerService: MailServerService,
  ) {}
  async create(
    customerId: string,
    deliveryTo: CreateShipmentDto,
    orderItems: OrderItemDto[],
  ): Promise<Order> {
    const total =
      orderItems.reduce((acc, current) => acc + current.subTotal, 0) +
      deliveryTo.fee;
    const randomTurn = Math.floor(Math.random() * 1000) + 1;

    const newOrder = await this.prisma.order.create({
      data: {
        total: +total.toFixed(2),
        customer: {
          connect: {
            id: customerId,
          },
        },
        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
        deliverTo: {
          create: {
            ...deliveryTo,
            address: {
              connect: {
                id: deliveryTo.address.id,
              },
            },
          },
        },
        payment: {
          create: {
            status: randomTurn % 2 == 0 ? 'approved' : 'rejected',
            paidAt: new Date(),
          },
        },
      },
      include: {
        orderItems: true,
        payment: true,
        deliverTo: {
          include: {
            address: true,
          },
        },
      },
    });

    return plainToInstance(Order, newOrder);
  }

  async findAll(
    paginationDto: PaginationDto,
    customerId?: string,
  ): Promise<Order[]> {
    let orders: Order[];
    const { limit, offset } = paginationDto;

    if (customerId) {
      orders = await this.prisma.order.findMany({
        where: { customerId },
        include: {
          customer: true,
          orderItems: true,
          payment: true,
          deliverTo: {
            include: {
              address: true,
            },
          },
        },
        skip: offset,
        take: limit ?? DEFAULT_PAGINATION_SIZE.ORDERS,
      });
    }

    orders = await this.prisma.order.findMany({
      include: {
        customer: true,
        orderItems: true,
        payment: true,
        deliverTo: {
          include: {
            address: true,
          },
        },
      },
      skip: offset,
      take: limit ?? DEFAULT_PAGINATION_SIZE.ORDERS,
    });

    return plainToInstance(Order, orders);
  }

  async findOne(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        orderItems: true,
        payment: true,
        deliverTo: {
          include: {
            address: true,
          },
        },
      },
    });

    return plainToInstance(Order, order);
  }

  async updateStock(orderItems: OrderItemDto[]): Promise<void> {
    const products = orderItems.map(async (item) => {
      const stock = await this.prisma.stock.findUnique({
        where: {
          productId: item.productId,
        },
        include: {
          product: true,
        },
      });

      const quantity = stock.quantity - item.quantity;
      if (quantity == 0) {
        await this.prisma.stock.update({
          where: { id: stock.id },
          data: {
            quantity,
            isAvailable: false,
          },
        });

        return {
          id: stock.product.id,
          name: stock.product.name,
          quantity,
          minimum: stock.minimum,
        };
      }

      await this.prisma.stock.update({
        where: { id: stock.id },
        data: {
          quantity,
        },
      });

      if (quantity == stock.minimum) {
        return {
          id: stock.product.id,
          name: stock.product.name,
          quantity,
          minimum: stock.minimum,
        };
      }
    });

    const productsMail = await Promise.all(products);

    await this.notifyStock(productsMail);
  }

  async notifyStock(products: IProductsMail[]): Promise<void> {
    const admins = await this.prisma.user.findMany({
      where: {
        type: 'admin',
      },
      select: {
        email: true,
      },
    });

    const emails = admins.map((admin) => admin.email);

    const lowProducts = products.filter((pd) => pd.quantity == pd.minimum);

    if (lowProducts.length) {
      const template = this.mailServerService.notificationLowStockTemplate(
        lowProducts,
        emails,
      );

      await this.mailServerService.sendEmail(template);
    }

    const outProducts = products.filter((pd) => pd.quantity < pd.minimum);

    if (outProducts.length) {
      const template = this.mailServerService.notificationOutStockTemplate(
        outProducts,
        emails,
      );

      await this.mailServerService.sendEmail(template);
    }
  }

  async updateStatus(status: string, id: string): Promise<Order | null> {
    const order = await this.prisma.order.update({
      where: { id },
      data: { status: StatusOrder[status] },
      include: {
        customer: true,
        deliverTo: true,
        payment: true,
        orderItems: true,
      },
    });

    return plainToInstance(Order, order);
  }
}

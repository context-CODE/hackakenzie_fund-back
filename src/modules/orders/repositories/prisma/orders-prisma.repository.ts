import { Injectable } from '@nestjs/common';
import { StatusOrder } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { Order } from '../../entities/order.entity';
import { OrdersRepository } from '../orders.repository';
import { PrismaService } from 'src/database/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DEFAULT_PAGINATION_SIZE } from 'src/common/util/common.constants';

@Injectable()
export class OrdersPrismaRepository implements OrdersRepository {
  constructor(private prisma: PrismaService) {}
  async create(customerId: string, deliveryId: string): Promise<Order> {
    const randomTurn = Math.floor(Math.random() * 1000) + 1;

    const newOrder = await this.prisma.order.create({
      data: {
        customer: {
          connect: {
            id: customerId,
          },
        },
        deliverTo: {
          connect: {
            id: deliveryId,
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
        deliverTo: true,
        payment: true,
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
        include: { customer: true, deliverTo: true, payment: true },
        skip: offset,
        take: limit ?? DEFAULT_PAGINATION_SIZE.ORDERS,
      });
    }

    orders = await this.prisma.order.findMany({
      include: { customer: true, deliverTo: true, payment: true },
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
        deliverTo: true,
        payment: true,
        orderItems: true,
      },
    });

    return plainToInstance(Order, order);
  }

  async updateTotal(total: number, id: string): Promise<void> {
    await this.prisma.order.update({
      where: { id },
      data: { total },
    });
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

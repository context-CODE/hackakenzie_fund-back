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
        include: { deliverTo: true },
        skip: offset,
        take: limit ?? DEFAULT_PAGINATION_SIZE.ORDERS,
      });
    }

    orders = await this.prisma.order.findMany({
      include: { deliverTo: true },
      skip: offset,
      take: limit ?? DEFAULT_PAGINATION_SIZE.ORDERS,
    });

    return plainToInstance(Order, orders);
  }

  async findOne(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
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
    });

    return plainToInstance(Order, order);
  }
}

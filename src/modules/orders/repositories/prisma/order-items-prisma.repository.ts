import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { OrderItem } from '../../entities/order-item.entity';
import { OrderItemsRepository } from '../order-items.repository';
import { CreateOrderItemDto } from '../../dto/create-order-item.dto';

@Injectable()
export class OrderItemsPrismaRepository implements OrderItemsRepository {
  constructor(private prisma: PrismaService) {}
  async create(
    data: CreateOrderItemDto[],
    orderId: string,
  ): Promise<OrderItem[]> {
    const newOrderItems = new Array(data.length).fill({});

    data.forEach((item, index) => {
      newOrderItems[index] = new OrderItem();
      const { price, quantity, product } = item;

      Object.assign(newOrderItems[index], {
        price,
        quantity,
        subTotal: quantity * price,
        productId: product.id,
        orderId,
      });
    });

    await this.prisma.orderItem.createMany({
      data: newOrderItems,
    });

    return plainToInstance(OrderItem, newOrderItems);
  }
}

import { Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItemsService } from './order-items.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrdersRepository } from './repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private readonly usersService: UsersService,
    private readonly orderItemsService: OrderItemsService,
  ) {}
  async create(customerId: string, data: CreateOrderDto): Promise<Order> {
    const orderItemsWithPrice =
      await this.orderItemsService.createOrderItemsWithPrice(data.orderItems);

    const newOrder = await this.ordersRepository.create(
      customerId,
      data.deliverTo,
      orderItemsWithPrice,
    );

    if (
      newOrder.payment.status == 'rejected' ||
      newOrder.payment.status == 'pending'
    ) {
      return newOrder;
    }

    await this.ordersRepository.updateStock(orderItemsWithPrice);

    return newOrder;
  }

  async findAll(
    paginationDto: PaginationDto,
    customerId: string,
  ): Promise<Order[]> {
    const user = await this.usersService.findOne(customerId);

    if (user.type == 'admin') {
      return await this.ordersRepository.findAll(paginationDto);
    }

    return await this.ordersRepository.findAll(paginationDto, user.id);
  }

  async findOne(id: string): Promise<Order> {
    return await this.ordersRepository.findOne(id);
  }

  async update(id: string, { status }: UpdateOrderDto): Promise<Order> {
    await this.findOne(id);

    return await this.ordersRepository.updateStatus(status, id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './repositories/orders.repository';
import { OrderItemsService } from './order-items.service';
import { UsersService } from '../users/users.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private readonly orderItemsService: OrderItemsService,
    private readonly usersService: UsersService,
  ) {}
  async create(customerId: string, data: CreateOrderDto) {
    const { deliverTo, ...createOrderItemsDto } = data;

    const newOrder = await this.ordersRepository.create(
      customerId,
      deliverTo.id,
    );

    const orderItems = await this.orderItemsService.createMany(
      createOrderItemsDto.orderItems,
      newOrder.id,
    );

    const total = orderItems.reduce(
      (acc, current) => acc + current.subTotal,
      0,
    );

    await this.ordersRepository.updateTotal(total, newOrder.id);

    return { ...newOrder, total, orderItems };
  }

  async findAll(paginationDto: PaginationDto, customerId: string) {
    const user = await this.usersService.findOne(customerId);

    if (user.type == 'SELLER') {
      return await this.ordersRepository.findAll(paginationDto);
    }

    return await this.ordersRepository.findAll(paginationDto, user.id);
  }

  async findOne(id: string) {
    return await this.ordersRepository.findOne(id);
  }

  async update(id: string, { status }: UpdateOrderDto) {
    const order = await this.findOne(id);

    return await this.ordersRepository.updateStatus(status, order.id);
  }
}

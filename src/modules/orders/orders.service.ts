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
    const { deliverTo, ...createOrderItemsDto } = data;

    const newOrder = await this.ordersRepository.create(
      customerId,
      deliverTo.id,
    );

    const orderItems = await this.orderItemsService.createMany(
      createOrderItemsDto.orderItems,
      newOrder.id,
    );

    const total =
      orderItems.reduce((acc, current) => acc + current.subTotal, 0) +
      newOrder.deliverTo.fee;

    await this.ordersRepository.updateTotal(total, newOrder.id);

    if (
      newOrder.payment.status == 'rejected' ||
      newOrder.payment.status == 'pending'
    ) {
      return { ...newOrder, total, orderItems };
    }

    orderItems.forEach(async (_, index) => {
      await this.orderItemsService.updateStock(
        createOrderItemsDto.orderItems[index].product.id,
      );
    });

    return { ...newOrder, total, orderItems };
  }

  async findAll(
    paginationDto: PaginationDto,
    customerId: string,
  ): Promise<Order[]> {
    const user = await this.usersService.findOne(customerId);

    if (user.type == 'SELLER') {
      return await this.ordersRepository.findAll(paginationDto);
    }

    return await this.ordersRepository.findAll(paginationDto, user.id);
  }

  async findOne(id: string): Promise<Order> {
    return await this.ordersRepository.findOne(id);
  }

  async update(id: string, { status }: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    return await this.ordersRepository.updateStatus(status, order.id);
  }
}

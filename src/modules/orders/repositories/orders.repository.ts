import { Order } from '../entities/order.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export abstract class OrdersRepository {
  abstract create(customerId: string, deliveryId: string): Promise<Order>;
  abstract findAll(
    paginationDto: PaginationDto,
    customerId?: string,
  ): Promise<Order[]>;
  abstract findOne(id: string): Promise<Order | null>;
  abstract updateTotal(total: number, id: string): Promise<void>;
  abstract updateStatus(status: string, id: string): Promise<Order | null>;
}

import { OrderItem } from '../entities/order-item.entity';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';

export abstract class OrderItemsRepository {
  abstract create(
    data: CreateOrderItemDto[],
    orderId: string,
  ): Promise<OrderItem[]>;

  abstract updateStock(productId: string): Promise<void>;
}

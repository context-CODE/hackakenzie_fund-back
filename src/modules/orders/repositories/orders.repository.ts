import { Order } from '../entities/order.entity';
import { OrderItemDto } from '../dto/create-order-item.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateShipmentDto } from 'src/modules/shipments/dto/create-shipment.dto';
import { IProductsMail } from 'src/modules/mail-server/mail.interface';

export abstract class OrdersRepository {
  abstract create(
    customerId: string,
    deliveryTo: CreateShipmentDto,
    orderItems: OrderItemDto[],
  ): Promise<Order>;
  abstract findAll(
    paginationDto: PaginationDto,
    customerId?: string,
  ): Promise<Order[]>;
  abstract findOne(id: string): Promise<Order | null>;
  abstract updateStock(orderItems: OrderItemDto[]): Promise<void>;
  abstract notifyStock(products: IProductsMail[]): Promise<void>;
  abstract updateStatus(status: string, id: string): Promise<Order | null>;
}

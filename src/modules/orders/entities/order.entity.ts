import { randomUUID } from 'crypto';
import { StatusOrder } from '@prisma/client';
import { OrderItem } from './order-item.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Shipment } from 'src/modules/shipments/entities/shipment.entity';
import { Payment } from './payment.entity';

export class Order {
  readonly id: string;

  orderedAt: Date;
  status: StatusOrder;
  total: number;

  readonly customer: User;
  readonly deliverTo: Shipment;
  readonly payment: Payment;
  readonly orderItems: OrderItem[];

  constructor() {
    this.id = randomUUID();
  }
}

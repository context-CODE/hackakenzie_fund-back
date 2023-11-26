import { randomUUID } from 'crypto';
import { Order } from './order.entity';
import { StatusPayment } from '@prisma/client';

export class Payment {
  readonly id: string;

  readonly createdAt: Date;
  readonly paidAt?: Date | null;
  readonly status: StatusPayment;

  readonly order?: Order;

  constructor() {
    this.id = randomUUID();
  }
}

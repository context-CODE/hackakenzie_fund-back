import { randomUUID } from 'crypto';
import { StatusPayment } from '@prisma/client';

export class Payment {
  readonly id: string;

  readonly createdAt: Date;
  readonly paidAt?: Date | null;
  readonly status: StatusPayment;

  constructor() {
    this.id = randomUUID();
  }
}

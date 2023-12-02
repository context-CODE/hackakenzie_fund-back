import { randomUUID } from 'crypto';

export class OrderItem {
  readonly id: string;

  price: number;
  quantity: number;
  subTotal: number;

  constructor() {
    this.id = randomUUID();
  }
}

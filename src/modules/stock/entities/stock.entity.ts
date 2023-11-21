import { randomUUID } from 'crypto';
import { Expose } from 'class-transformer';

export class Stock {
  readonly id: string;

  quantity: number;
  minimum: number;

  constructor() {
    this.id = randomUUID();
  }

  @Expose()
  get isAvailable() {
    return this.quantity >= this.minimum;
  }
}

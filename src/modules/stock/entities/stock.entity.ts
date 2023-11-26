import { randomUUID } from 'crypto';
import { Expose } from 'class-transformer';
import { Product } from 'src/modules/products/entities/product.entity';

export class Stock {
  readonly id: string;

  quantity: number;
  minimum: number;

  readonly product?: Product;

  constructor() {
    this.id = randomUUID();
  }

  @Expose()
  get isAvailable() {
    return this.quantity >= this.minimum;
  }
}

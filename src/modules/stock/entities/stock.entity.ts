import { randomUUID } from 'crypto';
import { Product } from 'src/modules/products/entities/product.entity';

export class Stock {
  readonly id: string;
  readonly isAvailable: boolean;

  quantity: number;
  minimum: number;

  readonly product?: Product;

  constructor() {
    this.id = randomUUID();
  }
}

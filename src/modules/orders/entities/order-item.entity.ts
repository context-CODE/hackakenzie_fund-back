import { randomUUID } from 'crypto';
import { Product } from 'src/modules/products/entities/product.entity';

export class OrderItem {
  readonly id: string;

  price: number;
  quantity: number;
  subTotal: number;

  readonly product?: Product;

  constructor() {
    this.id = randomUUID();
  }
}

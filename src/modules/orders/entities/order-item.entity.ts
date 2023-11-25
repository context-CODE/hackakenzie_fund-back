import { randomUUID } from 'crypto';
import { Order } from './order.entity';
import { Product } from 'src/modules/products/entities/product.entity';

export class OrderItem {
  readonly id: string;

  price: number;
  quantity: number;

  readonly subTotal: number;

  readonly order: Order;
  readonly product: Product;

  constructor() {
    this.id = randomUUID();

    this.subTotal = this.quantity * this.price;
  }
}

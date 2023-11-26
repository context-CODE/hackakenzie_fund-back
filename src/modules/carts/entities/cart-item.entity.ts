import { randomUUID } from 'crypto';
import { Cart } from './cart.entity';
import { Product } from 'src/modules/products/entities/product.entity';

export class CartItem {
  readonly id: string;

  price: number;
  quantity: number;

  readonly subTotal: number;

  readonly cart: Cart;
  readonly product: Product;

  constructor() {
    this.id = randomUUID();

    this.subTotal = this.quantity * this.price;
  }
}

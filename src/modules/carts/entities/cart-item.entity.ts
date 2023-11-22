import { randomUUID } from 'crypto';
import { Cart } from './cart.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Expose } from 'class-transformer';

export class CartItem {
  readonly id: string;

  price: number;
  quantity: number;

  readonly cart: Cart;
  readonly product: Product;

  constructor() {
    this.id = randomUUID();
  }

  @Expose()
  get subTotal() {
    return this.quantity * this.price;
  }
}

import { randomUUID } from 'crypto';
import { CartItem } from './cart-item.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Expose } from 'class-transformer';

export class Cart {
  readonly id: string;

  readonly customer: User;
  readonly cartItems?: CartItem[];

  constructor() {
    this.id = randomUUID();
  }

  @Expose()
  get total() {
    return this.cartItems?.reduce((acc, current) => acc + current.subTotal, 0);
  }
}

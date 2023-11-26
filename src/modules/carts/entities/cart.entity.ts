import { randomUUID } from 'crypto';
import { CartItem } from './cart-item.entity';
import { User } from 'src/modules/users/entities/user.entity';

export class Cart {
  readonly id: string;

  readonly customer: User;
  readonly cartItems?: CartItem[];

  readonly total: number;

  constructor() {
    this.id = randomUUID();

    this.total = this.cartItems?.reduce(
      (acc, current) => acc + current.subTotal,
      0,
    );
  }
}

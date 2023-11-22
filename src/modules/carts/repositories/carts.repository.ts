import { Cart } from '../entities/cart.entity';

export abstract class CartsRepository {
  abstract create(customerId: string): Promise<Cart>;
  abstract findOne(id: string): Promise<Cart | null>;
  abstract update(): Promise<Cart | null>;
  abstract remove(id: string): Promise<void>;
}

import { Cart } from '../entities/cart.entity';

export abstract class CartsRepository {
  abstract create(customerId: string): Promise<Cart>;
  abstract findOne(id: string): Promise<Cart | null>;
  abstract updateTotal(total: number, id: string): Promise<void>;
  abstract remove(id: string): Promise<void>;
}

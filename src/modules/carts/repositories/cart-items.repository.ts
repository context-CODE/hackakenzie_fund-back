import { CartItem } from '../entities/cart-item.entity';
import { CreateCartItemDto } from '../dto/create-cart-item.dto';

export abstract class CartItemsRepository {
  abstract create(
    data: CreateCartItemDto[],
    cartId: string,
  ): Promise<CartItem[]>;
}

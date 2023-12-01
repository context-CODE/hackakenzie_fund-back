import { OmitType } from '@nestjs/mapped-types';
import { CreateCartItemDto } from 'src/modules/carts/dto/create-cart-item.dto';

export class CreateOrderItemDto extends CreateCartItemDto {}

export class OrderItemDto extends OmitType(CreateOrderItemDto, ['product']) {
  subTotal: number;
  productId: string;
}

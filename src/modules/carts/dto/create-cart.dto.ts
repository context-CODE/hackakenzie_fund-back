import { Type } from 'class-transformer';
import { CreateCartItemDto } from './create-cart-item.dto';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';

export class CreateCartDto {
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateCartItemDto)
  readonly cartItems: CreateCartItemDto[];
}

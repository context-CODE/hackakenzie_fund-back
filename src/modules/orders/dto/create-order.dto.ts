import { IdDto } from 'src/common/dto/id.dto';
import { IsEntity } from 'src/common/decorators/isEntity.decorator';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsEntity()
  deliverTo: IdDto;

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}

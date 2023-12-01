import { Type } from 'class-transformer';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';
import { CreateShipmentDto } from 'src/modules/shipments/dto/create-shipment.dto';

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => CreateShipmentDto)
  deliverTo: CreateShipmentDto;

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}

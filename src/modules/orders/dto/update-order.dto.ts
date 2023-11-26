import { StatusOrder } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { IsNotEmptyString } from 'src/common/decorators/isNoEmptyString.decorator';

export class UpdateOrderDto {
  @IsNotEmptyString()
  @IsEnum(StatusOrder)
  status: StatusOrder;
}

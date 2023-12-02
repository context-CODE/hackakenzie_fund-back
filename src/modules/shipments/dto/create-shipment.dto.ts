import { Option } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { IsCurrency } from 'src/common/decorators/isCurrency.decorator';
import { IsEntity } from 'src/common/decorators/isEntity.decorator';
import { IdDto } from 'src/common/dto/id.dto';

export class CreateShipmentDto {
  @IsCurrency()
  fee: GLfloat;

  @IsEnum(Option)
  option: Option;

  @IsOptional()
  @IsString()
  trackCode: string;

  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  shippedAt: Date;

  @IsDateString({ strict: true, strictSeparator: true })
  deliveredUntil: Date;

  @IsEntity()
  address: IdDto;
}

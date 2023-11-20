import { IsDateString, IsOptional, IsString } from 'class-validator';
import { IsCurrency } from 'src/common/decorators/isCurrency.decorator';

export class CreateShipmentDto {
  @IsCurrency()
  fee: GLfloat;

  @IsOptional()
  @IsString()
  option: 'standard' | 'fast';

  @IsOptional()
  @IsString()
  trackCode: string;

  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  shippedAt: Date;

  @IsDateString({ strict: true, strictSeparator: true })
  deliveredUntil: Date;
}

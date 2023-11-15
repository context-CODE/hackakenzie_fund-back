import { IsNumber, IsString } from 'class-validator';

export class CreateShipmentDto {
  @IsNumber()
  fee: GLfloat;

  @IsString()
  option: 'standard' | 'fast';

  @IsString()
  trackCode: string;

  @IsString()
  deliveredUntil: Date;
}

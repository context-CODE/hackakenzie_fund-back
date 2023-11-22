import { IsOptional } from 'class-validator';
import { IsCardinal } from 'src/common/decorators/isCardinal.decorator';

export class CreateStockDto {
  @IsCardinal()
  quantity: number;

  @IsOptional()
  @IsCardinal()
  minimum: number;
}

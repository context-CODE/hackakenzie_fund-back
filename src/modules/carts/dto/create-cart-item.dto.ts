import { IdDto } from 'src/common/dto/id.dto';
import { IsEntity } from 'src/common/decorators/isEntity.decorator';
import { IsCardinal } from 'src/common/decorators/isCardinal.decorator';
import { IsCurrency } from 'src/common/decorators/isCurrency.decorator';
import { IsOptional } from 'class-validator';

export class CreateCartItemDto {
  @IsEntity()
  readonly product: IdDto;

  @IsOptional()
  @IsCurrency()
  readonly price: number;

  @IsCardinal()
  readonly quantity: number;
}

import {
  Length,
  ArrayNotEmpty,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IdDto } from 'src/common/dto/id.dto';
import { IsEntity } from 'src/common/decorators/isEntity.decorator';
import { IsCurrency } from 'src/common/decorators/isCurrency.decorator';
import { CreateImageDto } from 'src/modules/images/dto/create-image.dto';
import { IsNotEmptyString } from 'src/common/decorators/isNoEmptyString.decorator';

class SpecificationProductDto {
  @IsNotEmptyString()
  @Length(2, 30)
  brand: string;

  @IsNotEmptyString()
  @Length(2, 30)
  model: string;

  @IsNotEmptyString()
  @Length(2, 30)
  manufacturer: string;

  @IsNotEmptyString()
  @Length(5, 10)
  warranty: string;

  @IsNotEmptyString()
  @Length(2, 30)
  material: string;

  @IsNotEmptyString()
  @Length(9)
  size: string;

  @IsNotEmptyString()
  @Length(2, 15)
  weight: string;
}

export class RequestProductDto {
  @IsNotEmptyString()
  @Length(3, 80)
  name: string;

  @IsNotEmptyString()
  @Length(3)
  slug: string;

  @IsCurrency()
  price: number;

  @IsNotEmptyString()
  @Length(3)
  description: string;

  @IsNotEmptyString()
  @Length(2, 20)
  color: string;

  @IsNotEmptyString()
  @Length(11, 11)
  sku: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SpecificationProductDto)
  specifications: SpecificationProductDto;

  @IsEntity()
  category: IdDto;

  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateImageDto)
  images: CreateImageDto[];
}

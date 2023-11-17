import { Type } from 'class-transformer';
import { IdDto } from 'src/common/dto/id.dto';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { CreateImageDto } from './create-image.dto';
import { IsEntity } from 'src/common/decorators/isEntity.decorator';

export class RequestOneImageDto {
  @ValidateNested()
  @Type(() => CreateImageDto)
  image: CreateImageDto;

  @IsEntity()
  product: IdDto;
}

export class RequestMultiImagesDto {
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateImageDto)
  images: CreateImageDto[];

  @IsEntity()
  product: IdDto;
}

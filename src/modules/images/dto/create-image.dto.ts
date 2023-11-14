import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsNotEmptyString } from 'src/common/decorators/isNoEmptyString.decorator';

export class CreateImageDto {
  @IsNotEmptyString()
  title: string;

  @IsOptional()
  @Transform(({ value }) => (/true/.test(`${value}`) ? true : false))
  isCover: boolean;
}

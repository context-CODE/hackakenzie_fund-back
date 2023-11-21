import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsNotEmptyString } from 'src/common/decorators/is-not-empty-string.decorator';

export class CreateImageDto {
  @IsNotEmptyString()
  title: string;

  @IsOptional()
  @Transform(({ value }) => !!/true/.test(`${value}`))
  isCover: boolean;
}

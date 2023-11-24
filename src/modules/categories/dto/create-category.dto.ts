import { Length, MinLength } from 'class-validator';
import { IsNotEmptyString } from 'src/common/decorators/isNoEmptyString.decorator';

export class CreateCategoryDto {
  @IsNotEmptyString()
  @Length(2, 20)
  name: string;

  @IsNotEmptyString()
  @MinLength(2)
  slug: string;
}

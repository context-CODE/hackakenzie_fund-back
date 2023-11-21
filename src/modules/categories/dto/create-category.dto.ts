import { Length, MinLength } from 'class-validator';
import { IsNotEmptyString } from 'src/common/decorators/is-not-empty-string.decorator';

export class CreateCategoryDto {
  @IsNotEmptyString()
  @Length(2, 20)
  name: string;

  @IsNotEmptyString()
  @MinLength(2)
  slug: string;
}

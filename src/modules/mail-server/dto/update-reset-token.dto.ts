import { MinLength } from 'class-validator';
import { IsNotEmptyString } from 'src/common/decorators/isNoEmptyString.decorator';

export class UpdateResetTokenDto {
  @IsNotEmptyString()
  @MinLength(6)
  password: string;
}

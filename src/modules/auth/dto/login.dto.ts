import { IsEmail } from 'class-validator';
import { IsNotEmptyString } from 'src/common/decorators/isNoEmptyString.decorator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmptyString()
  password: string;
}

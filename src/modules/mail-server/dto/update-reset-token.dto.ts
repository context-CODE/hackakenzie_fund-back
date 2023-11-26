import { IsPassword } from 'src/common/decorators/isPassword.decorator';

export class UpdateResetTokenDto {
  @IsPassword()
  password: string;
}

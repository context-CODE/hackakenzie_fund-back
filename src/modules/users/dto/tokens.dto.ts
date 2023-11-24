import { IsOptional, IsString } from 'class-validator';
import { IsNotEmptyString } from 'src/common/decorators/isNoEmptyString.decorator';

export class TokensDto {
  @IsOptional()
  @IsString()
  resetToken?: string;

  @IsOptional()
  @IsString()
  confirmationToken?: string;
}

export class ConfirmationTokenDto {
  @IsNotEmptyString()
  confirmationToken: string;
}

export class resetTokenDto {
  @IsNotEmptyString()
  resetToken: string;
}

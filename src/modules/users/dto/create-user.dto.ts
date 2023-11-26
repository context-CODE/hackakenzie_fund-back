import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { IsNotEmptyString } from 'src/common/decorators/isNoEmptyString.decorator';
import { IsPassword } from 'src/common/decorators/isPassword.decorator';

export class CreateUserDto {
  @IsString()
  @Length(2, 50)
  fullName: string;

  @IsEmail()
  @MaxLength(70)
  email: string;

  @IsPassword()
  @Transform(({ value }) => hashSync(value, 10))
  password: string;

  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsString()
  @Length(11, 11)
  phone: string;

  @IsNotEmptyString()
  @Length(10, 10)
  birthday: string;

  @IsOptional()
  @IsString()
  type: 'SELLER' | 'CLIENT';
}

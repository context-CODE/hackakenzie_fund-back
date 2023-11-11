import { hashSync } from 'bcrypt';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  fullName: string;

  @IsString()
  @IsEmail()
  @MaxLength(70)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(120)
  @Transform(({ value }) => hashSync(value, 10))
  password: string;

  @MaxLength(11)
  @IsString()
  cpf: string;

  @IsString()
  phone: string;

  @IsDate()
  birthday: string;

  @IsString()
  type: 'SELLER' | 'CLIENT';
}

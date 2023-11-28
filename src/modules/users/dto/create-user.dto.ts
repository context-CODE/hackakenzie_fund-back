import {
  IsEmail,
  IsEnum,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { hashSync } from 'bcryptjs';
import { TypeUser } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmptyString } from 'src/common/decorators/isNoEmptyString.decorator';

export class CreateUserDto {
  @IsString()
  @Length(2, 50)
  fullName: string;

  @IsEmail()
  @MaxLength(70)
  email: string;

  @IsNotEmptyString()
  @MinLength(6)
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

  @IsEnum(TypeUser)
  type: TypeUser;
}

import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @MaxLength(90)
  responsible: string;

  @IsString()
  @MaxLength(50)
  district: string;

  @IsString()
  @MinLength(8)
  @MaxLength(8)
  zipCode: string;

  @IsString()
  @MaxLength(50)
  street: string;

  @IsString()
  @MaxLength(50)
  city: string;

  @IsString()
  @MaxLength(2)
  @MinLength(2)
  state: string;

  @IsString()
  @MaxLength(5)
  number: string;

  @IsString()
  @MaxLength(20)
  complement: string;

  @IsString()
  @MaxLength(30)
  reference: string;

  @IsBoolean()
  isDefault: boolean;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

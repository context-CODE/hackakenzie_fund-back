import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @MaxLength(90)
  @MinLength(3)
  responsible: string;

  @IsString()
  @MaxLength(50)
  @MinLength(3)
  district: string;

  @IsString()
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
  state: string;

  @IsString()
  @MaxLength(5)
  number: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  complement?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  reference?: string;

  @IsBoolean()
  isDefault: boolean;
}

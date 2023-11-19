import {
  IsBoolean,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @Length(3, 90)
  responsible: string;

  @IsString()
  @Length(3, 50)
  district: string;

  @IsString()
  @Length(8, 8)
  zipCode: string;

  @IsString()
  @MaxLength(50)
  street: string;

  @IsString()
  @MaxLength(50)
  city: string;

  @IsString()
  @Length(2, 2)
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

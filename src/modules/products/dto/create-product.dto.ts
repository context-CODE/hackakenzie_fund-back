import { OmitType } from '@nestjs/mapped-types';
import { RequestProductDto } from './request-product.dto';

export class CreateProductDto extends OmitType(RequestProductDto, [
  'images',
  'stock',
]) {}

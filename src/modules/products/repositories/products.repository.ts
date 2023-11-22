import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export abstract class ProductsRepository {
  abstract create(data: CreateProductDto): Promise<Product>;
  abstract findByName(name: string): Promise<Product | null>;
  abstract findBySku(sku: string): Promise<Product | null>;
  abstract findAll(paginationDto: PaginationDto): Promise<Product[]>;
  abstract findOne(id: string): Promise<Product | null>;
  abstract update(data: UpdateProductDto, id: string): Promise<Product | null>;
  abstract remove(id: string): Promise<void>;
}

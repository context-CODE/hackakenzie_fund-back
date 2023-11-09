import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export abstract class CategoriesRepository {
  abstract create(data: CreateCategoryDto): Promise<Category>;
  abstract findByName(name: string): Promise<Category | null>;
  abstract findAll(paginationDto: PaginationDto): Promise<Category[]>;
  abstract findOne(id: string): Promise<Category | null>;
  abstract update(data: UpdateCategoryDto, id: string): Promise<Category>;
  abstract remove(id: string): Promise<void>;
}

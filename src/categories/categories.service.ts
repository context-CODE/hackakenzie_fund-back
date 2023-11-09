import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CategoriesRepository } from './repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}
  async create(data: CreateCategoryDto): Promise<Category> {
    const categoryExists = await this.categoriesRepository.findByName(
      data.name,
    );

    if (categoryExists) {
      throw new ConflictException('Category already exists');
    }

    return await this.categoriesRepository.create(data);
  }

  findAll(paginationDto: PaginationDto) {
    return this.categoriesRepository.findAll(paginationDto);
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, data: UpdateCategoryDto) {
    const category = await this.findOne(id);

    return await this.categoriesRepository.update(data, category.id);
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    return await this.categoriesRepository.remove(category.id);
  }
}

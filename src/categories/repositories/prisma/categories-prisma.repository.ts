import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/categories/prisma.service';
import { CategoriesRepository } from '../categories.repository';
import { Category } from 'src/categories/entities/category.entity';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DEFAULT_PAGINATION_SIZE } from 'src/common/util/common.constants';

@Injectable()
export class CategoriesPrismaRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    Object.assign(category, {
      ...data,
    });

    const newCategory = await this.prisma.category.create({
      data: { ...category },
    });

    return plainToInstance(Category, newCategory);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.prisma.category.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    return category;
  }

  async findAll(paginationDto: PaginationDto): Promise<Category[]> {
    const { limit, offset } = paginationDto;

    const categories = await this.prisma.category.findMany({
      skip: offset,
      take: limit ?? DEFAULT_PAGINATION_SIZE.CATEGORIES,
    });

    return plainToInstance(Category, categories);
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    return plainToInstance(Category, category);
  }

  async update(data: UpdateCategoryDto, id: string): Promise<Category> {
    const category = await this.prisma.category.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Category, category);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }
}

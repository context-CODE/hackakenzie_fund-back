import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './repositories/categories.repository';
import { CategoriesPrismaRepository } from './repositories/prisma/categories-prisma.repository';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    PrismaService,
    {
      provide: CategoriesRepository,
      useClass: CategoriesPrismaRepository,
    },
  ],
})
export class CategoriesModule {}

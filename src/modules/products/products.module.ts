import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ImagesModule } from '../images/images.module';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsRepository } from './repositories/products.repository';
import { ProductsPrismaRepository } from './repositories/prisma/products-prisma.repository';

@Module({
  imports: [forwardRef(() => ImagesModule), CategoriesModule],
  exports: [ProductsService],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    {
      provide: ProductsRepository,
      useClass: ProductsPrismaRepository,
    },
  ],
})
export class ProductsModule {}

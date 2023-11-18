import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from 'src/database/prisma.service';
import { ProductsRepository } from './repositories/products.repository';
import { ProductsPrismaRepository } from './repositories/prisma/products-prisma.repository';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [ImagesModule],
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

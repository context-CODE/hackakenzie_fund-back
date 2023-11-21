import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartItemsService } from './cart-items.service';
import { PrismaService } from 'src/database/prisma.service';
import { ProductsModule } from '../products/products.module';
import { CartsRepository } from './repositories/carts.repository';
import { CartItemsRepository } from './repositories/cart-items.repository';
import { CartsPrismaRepository } from './repositories/prisma/carts-prisma.repository';
import { CartItemsPrismaRepository } from './repositories/prisma/cart-items-prisma.repository';

@Module({
  imports: [ProductsModule],
  exports: [CartsService],
  controllers: [CartsController],
  providers: [
    CartsService,
    CartItemsService,
    PrismaService,
    {
      provide: CartsRepository,
      useClass: CartsPrismaRepository,
    },
    {
      provide: CartItemsRepository,
      useClass: CartItemsPrismaRepository,
    },
  ],
})
export class CartsModule {}

import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsModule } from '../products/products.module';
import { OrderItemsService } from './order-items.service';
import { PrismaService } from 'src/database/prisma.service';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersPrismaRepository } from './repositories/prisma/orders-prisma.repository';
import { OrderItemsRepository } from './repositories/order-items.repository';
import { OrderItemsPrismaRepository } from './repositories/prisma/order-items-prisma.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
  exports: [OrdersService],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderItemsService,
    PrismaService,
    {
      provide: OrdersRepository,
      useClass: OrdersPrismaRepository,
    },
    {
      provide: OrderItemsRepository,
      useClass: OrderItemsPrismaRepository,
    },
  ],
})
export class OrdersModule {}

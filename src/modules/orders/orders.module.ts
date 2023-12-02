import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UsersModule } from '../users/users.module';
import { OrdersController } from './orders.controller';
import { OrderItemsService } from './order-items.service';
import { PrismaService } from 'src/database/prisma.service';
import { ProductsModule } from '../products/products.module';
import { OrdersRepository } from './repositories/orders.repository';
import { MailServerModule } from '../mail-server/mail-server.module';
import { OrdersPrismaRepository } from './repositories/prisma/orders-prisma.repository';

@Module({
  imports: [ProductsModule, UsersModule, MailServerModule],
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
  ],
})
export class OrdersModule {}

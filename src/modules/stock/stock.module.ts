import { Module, forwardRef } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { PrismaService } from 'src/database/prisma.service';
import { StockRepository } from './repositories/stock.repository';
import { StockPrismaRepository } from './repositories/prisma/stock-prisma.repository';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [forwardRef(() => ProductsModule)],
  exports: [StockService],
  controllers: [StockController],
  providers: [
    StockService,
    PrismaService,
    {
      provide: StockRepository,
      useClass: StockPrismaRepository,
    },
  ],
})
export class StockModule {}

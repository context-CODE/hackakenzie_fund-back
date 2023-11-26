/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { plainToInstance, plainToClass } from 'class-transformer';
import { Stock } from '../../entities/stock.entity';
import { PrismaService } from 'src/database/prisma.service';
import { StockRepository } from '../stock.repository';
import { UpdateStockDto } from '../../dto/update-stock.dto';

@Injectable()
export class StockPrismaRepository implements StockRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<Stock> {
    const stock = await this.prisma.stock.findUnique({
      where: { id },
    });

    return plainToClass(Stock, stock);
  }

  async update(data: UpdateStockDto, id: string): Promise<Stock> {
    const stock = await this.prisma.stock.update({
      where: { id },
      data,
    });

    return plainToInstance(Stock, stock);
  }
}

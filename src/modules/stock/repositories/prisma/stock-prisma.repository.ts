/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { plainToInstance, plainToClass } from 'class-transformer';
import { Stock } from '../../entities/stock.entity';
import { PrismaService } from 'src/database/prisma.service';
import { StockRepository } from '../stock.repository';
import { CreateStockDto } from '../../dto/create-stock.dto';
import { UpdateStockDto } from '../../dto/update-stock.dto';

@Injectable()
export class StockPrismaRepository implements StockRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateStockDto, productId: string): Promise<Stock | void> {
    const stock = new Stock();

    Object.assign(stock, {
      ...data,
    });

    const newStock = await this.prisma.stock.create({
      data: {
        ...stock,
        productId,
      },
    });

    return plainToInstance(Stock, newStock);
  }

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

  async remove(id: string): Promise<void> {
    /* Decidir qual ação a ser implementada */
  }
}

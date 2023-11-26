import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockRepository } from './repositories/stock.repository';

@Injectable()
export class StockService {
  constructor(private stockRepository: StockRepository) {}

  async findOne(id: string) {
    const stock = await this.stockRepository.findOne(id);

    if (!stock) {
      throw new NotFoundException('Stock not found');
    }

    return stock;
  }

  async update(id: string, data: UpdateStockDto) {
    const stock = await this.findOne(id);

    if (data.quantity) {
      data.quantity += stock.quantity;
    }

    return await this.stockRepository.update(data, stock.id);
  }
}

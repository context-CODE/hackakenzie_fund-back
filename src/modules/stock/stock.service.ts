import {
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockRepository } from './repositories/stock.repository';
import { ProductsService } from '../products/products.service';

@Injectable()
export class StockService {
  constructor(
    private stockRepository: StockRepository,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}
  async create(data: CreateStockDto, productId: string) {
    await this.productsService.findOne(productId);

    return await this.stockRepository.create(data, productId);
  }

  async findOne(id: string) {
    const stock = await this.stockRepository.findOne(id);

    if (!stock) {
      throw new NotFoundException('Stock not found');
    }

    return stock;
  }

  async update(id: string, data: UpdateStockDto) {
    const stock = await this.findOne(id);

    return await this.stockRepository.update(data, stock.id);
  }

  async remove(id: string) {
    const stock = await this.findOne(id);

    return await this.stockRepository.remove(stock.id);
  }
}

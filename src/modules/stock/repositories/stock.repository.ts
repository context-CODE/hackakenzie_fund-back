import { Stock } from '../entities/stock.entity';
import { CreateStockDto } from '../dto/create-stock.dto';
import { UpdateStockDto } from '../dto/update-stock.dto';

export abstract class StockRepository {
  abstract create(
    data: CreateStockDto,
    productId: string,
  ): Promise<Stock | void>;
  abstract findOne(id: string): Promise<Stock | null>;
  abstract update(data: UpdateStockDto, id: string): Promise<Stock | null>;
  abstract remove(id: string): Promise<void>;
}

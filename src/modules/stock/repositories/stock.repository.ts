import { Stock } from '../entities/stock.entity';
import { UpdateStockDto } from '../dto/update-stock.dto';

export abstract class StockRepository {
  // abstract findAll(): Promise<Stock | null>;
  abstract findOne(id: string): Promise<Stock | null>;
  abstract update(data: UpdateStockDto, id: string): Promise<Stock | null>;
}

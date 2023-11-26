import { Get, Body, Patch, Param, UseGuards, Controller } from '@nestjs/common';
import { IdDto } from 'src/common/dto/id.dto';
import { StockService } from './stock.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param() { id }: IdDto) {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param() { id }: IdDto, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }
}

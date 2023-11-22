import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { IdDto } from 'src/common/dto/id.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('product/:id')
  create(@Param() { id }: IdDto, @Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto, id);
  }

  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.stockService.remove(id);
  }
}

import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { IdDto } from 'src/common/dto/id.dto';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('product/:id')
  @UseGuards(JwtAuthGuard)
  create(@Param() { id }: IdDto, @Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto, id);
  }

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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param() { id }: IdDto) {
    return this.stockService.remove(id);
  }
}

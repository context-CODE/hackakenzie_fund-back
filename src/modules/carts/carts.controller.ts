import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { IdDto } from 'src/common/dto/id.dto';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('customer/:id')
  create(@Param() { id }: IdDto, @Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(id, createCartDto);
  }

  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.cartsService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.cartsService.remove(id);
  }
}

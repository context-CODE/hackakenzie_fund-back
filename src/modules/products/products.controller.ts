import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  UseInterceptors,
  UploadedFiles,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageOptions } from '../images/helpers/file-filter.helper';
import { RequestProductDto } from './dto/request-product.dto';
import { IdDto } from 'src/common/dto/id.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 5, imageOptions))
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() { data }: { data: string },
  ) {
    const requestProductDto: RequestProductDto = JSON.parse(data);

    return this.productsService.create(files, requestProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: IdDto) {
    return this.productsService.remove(id);
  }
}

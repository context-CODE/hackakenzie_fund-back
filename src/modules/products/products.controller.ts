import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  HttpCode,
  UseGuards,
  Controller,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { IdDto } from 'src/common/dto/id.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RequestProductDto } from './dto/request-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { imageOptions } from '../images/helpers/file-filter.helper';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  update(@Param() { id }: IdDto, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  remove(@Param() { id }: IdDto) {
    return this.productsService.remove(id);
  }
}

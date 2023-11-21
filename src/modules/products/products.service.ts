/* eslint-disable @typescript-eslint/no-unused-vars */
import { ImagesService } from '../images/images.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { RequestProductDto } from './dto/request-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepository } from './repositories/products.repository';
import { StockService } from '../stock/stock.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    @Inject(forwardRef(() => ImagesService))
    private readonly imagesService: ImagesService,
    @Inject(forwardRef(() => StockService))
    private readonly stockService: StockService,
    private readonly categoriesService: CategoriesService,
  ) {}
  async create(files: Array<Express.Multer.File>, data: RequestProductDto) {
    const { images, stock, ...productData } = data;

    await this.categoriesService.findOne(productData.category.id);

    const newProduct = await this.productsRepository.create(productData);
    const newImages = await this.imagesService.createMany(files, images, {
      id: newProduct.id,
    });
    const newStock = await this.stockService.create(stock, newProduct.id);

    return { ...newProduct, stock: newStock, images: newImages };
  }

  findAll(paginationDto: PaginationDto) {
    return this.productsRepository.findAll(paginationDto);
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    const product = await this.findOne(id);

    return await this.productsRepository.update(data, product.id);
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    return await this.productsRepository.remove(product.id);
  }
}

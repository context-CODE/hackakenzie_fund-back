/* eslint-disable @typescript-eslint/no-unused-vars */
import { ImagesService } from '../images/images.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { RequestProductDto } from './dto/request-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private readonly imagesService: ImagesService,
  ) {}
  async create(files: Array<Express.Multer.File>, data: RequestProductDto) {
    const { images, ...productData } = data;

    const newProduct = await this.productsRepository.create(productData);
    const newImages = await this.imagesService.createMany(files, images, {
      id: newProduct.id,
    });

    return { ...newProduct, images: newImages };
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

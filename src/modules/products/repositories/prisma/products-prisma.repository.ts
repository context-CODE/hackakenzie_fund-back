import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Product } from '../../entities/product.entity';
import { PrismaService } from 'src/database/prisma.service';
import { JsonObject } from '@prisma/client/runtime/library';
import { ProductsRepository } from '../products.repository';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { DEFAULT_PAGINATION_SIZE } from 'src/common/util/common.constants';

@Injectable()
export class ProductsPrismaRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateProductDto): Promise<Product> {
    await this.findByName(data.name);
    await this.findBySku(data.sku);

    const product = new Product();

    Object.assign(product, {
      ...data,
    });

    const { category, specifications, stock, ...productData } = product;
    const specificationsJson = specifications as JsonObject;
    const newProduct = await this.prisma.product.create({
      data: {
        ...productData,
        specifications: specificationsJson,
        category: {
          connect: {
            id: category.id,
          },
        },
        stock: {
          create: {
            ...stock,
          },
        },
      },
      include: {
        stock: true,
      },
    });

    return plainToInstance(Product, newProduct);
  }

  async findByName(name: string): Promise<void> {
    const product = await this.prisma.product.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        stock: true,
        images: true,
        category: true,
      },
    });

    if (product) {
      throw new ConflictException('Product already exists');
    }
  }

  async findBySku(sku: string): Promise<void> {
    const product = await this.prisma.product.findFirst({
      where: {
        sku: {
          contains: sku,
          mode: 'insensitive',
        },
      },
      include: {
        stock: true,
        images: true,
        category: true,
      },
    });

    if (product) {
      throw new ConflictException('Product already exists');
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Product[]> {
    const { limit, offset } = paginationDto;

    const products = await this.prisma.product.findMany({
      skip: offset,
      take: limit ?? DEFAULT_PAGINATION_SIZE.PRODUCTS,
      include: {
        stock: true,
        images: true,
        category: true,
      },
    });

    return plainToInstance(Product, products);
  }

  async findOne(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        stock: true,
        images: true,
        category: true,
      },
    });

    return plainToInstance(Product, product);
  }

  async update(data: UpdateProductDto, id: string): Promise<Product | null> {
    if (data.name) {
      await this.findByName(data.name);
    }

    if (data.sku) {
      await this.findBySku(data.sku);
    }

    const oldProduct = await this.findOne(id);

    const { specifications, ...productData } = data;
    const specificationsJson = specifications
      ? JSON.stringify(specifications)
      : oldProduct.specifications;

    const product = await this.prisma.product.update({
      where: { id },
      data: { ...productData, specifications: specificationsJson },
    });

    return plainToInstance(Product, product);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

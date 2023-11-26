import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItemsRepository } from './repositories/order-items.repository';

@Injectable()
export class OrderItemsService {
  constructor(
    private orderItemsRepository: OrderItemsRepository,
    private readonly productsService: ProductsService,
  ) {}
  async createMany(data: CreateOrderItemDto[], orderId: string) {
    const promises = data.map(async (item) => {
      if (!item.price) {
        const product = await this.productsService.findOne(item.product.id);

        return {
          ...item,
          price: product.price,
        };
      }

      return item;
    });

    const products = await Promise.all(promises);
    const orderItems = await this.orderItemsRepository.create(
      products,
      orderId,
    );

    return orderItems;
  }
}

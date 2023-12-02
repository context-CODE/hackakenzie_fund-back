import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(private readonly productsService: ProductsService) {}

  async createOrderItemsWithPrice(data: CreateOrderItemDto[]) {
    const promises = data.map(async (item) => {
      if (!item.price) {
        const product = await this.productsService.findOne(item.product.id);

        return {
          price: product.price,
          quantity: item.quantity,
          subTotal: +(item.quantity * product.price).toFixed(2),
          productId: product.id,
        };
      }

      return {
        price: item.price,
        quantity: item.quantity,
        subTotal: +(item.quantity * item.price).toFixed(2),
        productId: item.product.id,
      };
    });

    return await Promise.all(promises);
  }
}

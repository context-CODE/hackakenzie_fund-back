import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ProductsService } from '../products/products.service';
import { CartItemsRepository } from './repositories/cart-items.repository';

@Injectable()
export class CartItemsService {
  constructor(
    private cartItemsRepository: CartItemsRepository,
    private readonly productsService: ProductsService,
  ) {}
  async createMany(data: CreateCartItemDto[], cartId: string) {
    const promises = data.map(async (item) => {
      const product = await this.productsService.findOne(item.product.id);
      const productWithPrice = {
        ...item,
        price: product.price,
      };

      return productWithPrice;
    });

    const products = await Promise.all(promises);
    const cartItems = await this.cartItemsRepository.create(products, cartId);

    return cartItems;
  }
}

import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CartItemsRepository } from '../cart-items.repository';
import { CreateCartItemDto } from '../../dto/create-cart-item.dto';
import { CartItem } from '../../entities/cart-item.entity';

@Injectable()
export class CartItemsPrismaRepository implements CartItemsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCartItemDto[], cartId: string): Promise<CartItem[]> {
    const newCartItems = new Array(data.length).fill({});

    data.forEach((item, index) => {
      newCartItems[index] = new CartItem();
      const { price, quantity, product } = item;

      Object.assign(newCartItems[index], {
        price,
        quantity,
        subTotal: quantity * price,
        productId: product.id,
        cartId,
      });
    });

    await this.prisma.cartItem.createMany({
      data: newCartItems,
    });

    return plainToInstance(CartItem, newCartItems);
  }
}

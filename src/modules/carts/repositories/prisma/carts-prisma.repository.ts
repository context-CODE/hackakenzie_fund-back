import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Cart } from '../../entities/cart.entity';
import { CartsRepository } from '../carts.repository';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CartsPrismaRepository implements CartsRepository {
  constructor(private prisma: PrismaService) {}
  async create(customerId: string): Promise<Cart> {
    const newCart = await this.prisma.cart.create({
      data: {
        customerId,
      },
    });

    return plainToInstance(Cart, newCart);
  }

  async findOne(id: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: {
        cartItems: true,
      },
    });

    return plainToInstance(Cart, cart);
  }

  async updateTotal(total: number, id: string): Promise<void> {
    await this.prisma.cart.update({
      where: { id },
      data: { total },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.cart.delete({
      where: { id },
    });
  }
}

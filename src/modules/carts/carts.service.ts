import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartItemsService } from './cart-items.service';
import { CartsRepository } from './repositories/carts.repository';

@Injectable()
export class CartsService {
  constructor(
    private cartsRepository: CartsRepository,
    private readonly cartItemsService: CartItemsService,
  ) {}
  async create(customerId: string, createCartDto: CreateCartDto) {
    const newCart = await this.cartsRepository.create(customerId);
    const cartItems = await this.cartItemsService.createMany(
      createCartDto.cartItems,
      newCart.id,
    );

    const total = cartItems.reduce((acc, current) => acc + current.subTotal, 0);

    await this.cartsRepository.updateTotal(total, newCart.id);

    return { ...newCart, total, cartItems };
  }

  async findOne(id: string) {
    const cart = await this.cartsRepository.findOne(id);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart: ${updateCartDto}`;
  }

  async remove(id: string) {
    const cart = await this.findOne(id);

    return await this.cartsRepository.remove(cart.id);
  }
}

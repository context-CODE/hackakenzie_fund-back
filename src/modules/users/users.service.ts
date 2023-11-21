import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';
import { ProductsService } from '../products/products.service';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private readonly productSevice: ProductsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.userRepository.findByEmail(createUserDto.email);

    if (findUser) throw new ConflictException('Email already exists');

    const user = this.userRepository.create(createUserDto);

    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findOne(id: string, wishlists: boolean) {
    return this.userRepository.findOne(id, wishlists);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
  }
  async addProduct(productId: string, userId) {
    const user = await this.findOne(userId, false);
    const product = await this.productSevice.findOne(productId);
    if (!product || !user) {
      if (!product && !user) {
        throw new NotFoundException('user and product not found!');
      } else if (!user) {
        throw new NotFoundException('user not found!');
      } else {
        throw new NotFoundException('product not found!');
      }
    }
    return this.userRepository.addProduct(productId, userId);
  }
}

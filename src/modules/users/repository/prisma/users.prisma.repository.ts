import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersRepository } from '../users.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { User } from '../../entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, {
      ...createUserDto,
      createdAt: new Date(),
    });

    const newUser = await this.prisma.user.create({
      data: { ...user },
    });

    return plainToInstance(User, newUser);
  }
  async findOne(id: string, wishlists: boolean): Promise<User> {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          address: true,
          wishlists,
        },
      });
      return findUser;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async update(id: string, updateUserDto: any): Promise<User> {
    try {
      const updateUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...updateUserDto,
        },
      });
      return plainToInstance(User, updateUser);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async addProduct(productId: string, userId: string) {
    const add = await this.prisma.wishlists.create({
      data: {
        id: randomUUID(),
        userId: userId,
        productId: productId,
      },
    });

    return add;
  }
}

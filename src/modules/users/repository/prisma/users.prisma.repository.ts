import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersRepository } from '../users.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { User } from '../../entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { TokensDto } from '../../dto/tokens.dto';
import { hashSync } from 'bcryptjs';

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

  async findOne(id: string): Promise<User> {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          address: true,
        },
      });

      if (!findUser) throw new NotFoundException('user not found!');

      return plainToInstance(User, findUser);
    } catch (error) {
      return error.response;
    }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
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

  async findByToken(token: TokensDto): Promise<User | null> {
    let user: User;

    if (token.confirmationToken) {
      user = await this.prisma.user.findFirst({
        where: {
          confirmationToken: {
            contains: token.confirmationToken,
          },
        },
      });
    } else {
      user = await this.prisma.user.findFirst({
        where: {
          resetToken: {
            contains: token.resetToken,
          },
        },
      });
    }

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async updateToken(token: TokensDto, userId: string): Promise<void> {
    if (token.confirmationToken) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { confirmationToken: token.confirmationToken },
      });
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { resetToken: token.resetToken },
    });
  }

  async setIsEmailVerified(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { isEmailVerified: true },
    });
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { resetToken: null, password: hashSync(password, 10) },
    });
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.userRepository.findByEmail(createUserDto.email);

    if (findUser) throw new ConflictException('Email already exists');

    const user = this.userRepository.create(createUserDto);

    return user;
  }

  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.userRepository.findOne(id);

    if (!findUser) throw new NotFoundException('User not found');

    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string) {
    const findUser = await this.userRepository.findOne(id);

    if (!findUser) throw new NotFoundException('User not found');

    this.userRepository.delete(id);
  }
}

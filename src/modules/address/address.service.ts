import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './repository/address.repository';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    private addressRepository: AddressRepository,
    private usersService: UsersService,
  ) {}

  async checkUser(userId: string) {
    const findUser: User = await this.usersService.findOne(userId);

    if (!findUser) {
      throw new NotFoundException('user not found!');
    }
  }

  async create(userId: string, createAddressDto: CreateAddressDto) {
    await this.checkUser(userId);
    return this.addressRepository.create(userId, createAddressDto);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    await this.addressRepository.findOne(id);
    return this.addressRepository.update(id, updateAddressDto);
  }

  async remove(id: string) {
    await this.addressRepository.findOne(id);
    return this.addressRepository.delete(id);
  }
}

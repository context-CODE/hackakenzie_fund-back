import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './repository/address.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class AddressService {
  constructor(
    private addressRepository: AddressRepository,
    private usersService: UsersService,
  ) {}

  async create(userId: string, createAddressDto: CreateAddressDto) {
    await this.usersService.findOne(userId);
    return this.addressRepository.create(userId, createAddressDto);
  }

  async findOne(id: string) {
    return await this.addressRepository.findOne(id);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    await this.findOne(id);
    return this.addressRepository.update(id, updateAddressDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.addressRepository.delete(id);
  }
}

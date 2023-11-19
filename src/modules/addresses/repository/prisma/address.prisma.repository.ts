import { CreateAddressDto } from 'src/modules/addresses/dto/create-address.dto';
import { AddressRepository } from '../address.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Address } from '../../entities/address.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAddressDto } from '../../dto/update-address.dto';
import { validate } from 'class-validator';

@Injectable()
export class AddressPrismaRepository implements AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    const errors = await validate(createAddressDto);
    if (errors.length > 0) {
      throw new Error('Dados inválidos');
    }
    const address = new Address();
    Object.assign(address, { ...createAddressDto });

    const newAddress: Address = await this.prisma.address.create({
      data: { ...address, userId },
    });

    return plainToInstance(Address, newAddress);
  }

  async update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const updateAddress: Address = await this.prisma.address.update({
      where: {
        id,
      },
      data: {
        ...updateAddressDto,
      },
    });

    return plainToInstance(Address, updateAddress);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.address.delete({
      where: {
        id,
      },
    });
  }

  async findOne(addressId: string): Promise<void> {
    const address = await this.prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });

    if (!address) {
      throw new NotFoundException('address not found!');
    }
  }
}

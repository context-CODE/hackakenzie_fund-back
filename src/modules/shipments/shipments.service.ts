import { Injectable } from '@nestjs/common';
// import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { ShipmentsRepository } from './repository/shipments.repository';
import { AddressService } from '../addresses/address.service';

@Injectable()
export class ShipmentsService {
  constructor(
    readonly shipmentsRepository: ShipmentsRepository,
    private readonly addressService: AddressService,
  ) {}
  // async create(addressId: string, createShipmentDto: CreateShipmentDto) {
  //   await this.addressService.findOne(addressId);

  //   return await this.shipmentsRepository.create(addressId, createShipmentDto);
  // }

  async findAll(addressId: string) {
    return await this.shipmentsRepository.findAll(addressId);
  }

  async findOne(shipmentId: string) {
    return await this.shipmentsRepository.findOne(shipmentId);
  }

  async update(shipmentId: string, updateShipmentDto: UpdateShipmentDto) {
    return await this.shipmentsRepository.update(shipmentId, updateShipmentDto);
  }

  async remove(shipmentId: string) {
    return await this.shipmentsRepository.delete(shipmentId);
  }
}

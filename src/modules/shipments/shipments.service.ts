import { Injectable } from '@nestjs/common';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { AddressService } from '../addresses/address.service';
import { ShipmentsRepository } from './repository/shipments.repository';

@Injectable()
export class ShipmentsService {
  constructor(
    readonly shipmentsRepository: ShipmentsRepository,
    private readonly addressService: AddressService,
  ) {}

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

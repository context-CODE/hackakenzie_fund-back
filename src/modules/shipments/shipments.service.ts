import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { ShipmentsRepository } from './repository/shipments.repository';

@Injectable()
export class ShipmentsService {
  constructor(readonly shipmentsRepository: ShipmentsRepository) {}
  create(addressId: string, createShipmentDto: CreateShipmentDto) {
    return this.shipmentsRepository.create(addressId, createShipmentDto);
  }

  findAll(addressId: string) {
    return this.shipmentsRepository.findAll(addressId);
  }

  findOne(shipmentId: string) {
    return this.shipmentsRepository.findOne(shipmentId);
  }

  update(shipmentId: string, updateShipmentDto: UpdateShipmentDto) {
    return this.shipmentsRepository.update(shipmentId, updateShipmentDto);
  }

  remove(shipmentId: string) {
    return this.shipmentsRepository.delete(shipmentId);
  }
}

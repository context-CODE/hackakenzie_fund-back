import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { ShipmentsRepository } from './respository/shipments.repository';

@Injectable()
export class ShipmentsService {
  constructor(readonly shipmentsService: ShipmentsRepository) {}
  create(addressId: string, createShipmentDto: CreateShipmentDto) {
    return this.shipmentsService.create(addressId, createShipmentDto);
  }

  findAll(addressId?: string, shipmentId?: string) {
    if (addressId) {
      return this.shipmentsService.findAll(addressId);
    }
    if (shipmentId) {
      return this.findOne(shipmentId);
    }

    return this.shipmentsService.findAll(shipmentId);
  }

  findOne(shipmentId: string) {
    return this.shipmentsService.findOne(shipmentId);
  }

  update(shipmentId: string, updateShipmentDto: UpdateShipmentDto) {
    return this.shipmentsService.update(shipmentId, updateShipmentDto);
  }

  remove(shipmentId: string) {
    return this.shipmentsService.delete(shipmentId);
  }
}

// import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { UpdateShipmentDto } from '../dto/update-shipment.dto';
import { Shipment } from '../entities/shipment.entity';

export abstract class ShipmentsRepository {
  // abstract create(
  //   addressId: string,
  //   createAddressDto: CreateShipmentDto,
  // ): Promise<Shipment>;
  abstract update(
    shipmentId: string,
    createAddressDto: UpdateShipmentDto,
  ): Promise<Shipment>;
  abstract delete(shipmentId: string): Promise<void>;
  abstract findAll(addressId: string): Promise<Shipment[]>;
  abstract findOne(shipmentId: string): Promise<Shipment>;
}

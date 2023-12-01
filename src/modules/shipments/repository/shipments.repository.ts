import { Shipment } from '../entities/shipment.entity';
import { UpdateShipmentDto } from '../dto/update-shipment.dto';

export abstract class ShipmentsRepository {
  abstract update(
    shipmentId: string,
    createAddressDto: UpdateShipmentDto,
  ): Promise<Shipment>;
  abstract delete(shipmentId: string): Promise<void>;
  abstract findAll(addressId: string): Promise<Shipment[]>;
  abstract findOne(shipmentId: string): Promise<Shipment>;
}

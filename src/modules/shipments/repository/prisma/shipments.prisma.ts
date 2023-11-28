import { PrismaService } from 'src/database/prisma.service';
import { CreateShipmentDto } from '../../dto/create-shipment.dto';
import { UpdateShipmentDto } from '../../dto/update-shipment.dto';
import { Shipment } from '../../entities/shipment.entity';
import { ShipmentsRepository } from '../shipments.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ShipmentPrismaRepository implements ShipmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    addressId: string,
    createAddressDto: CreateShipmentDto,
  ): Promise<Shipment> {
    const shipments = new Shipment();

    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      throw new NotFoundException('address not found!');
    }

    Object.assign(shipments, { ...createAddressDto, addressId });

    const newShipment = await this.prisma.shipment.create({
      data: { ...shipments, addressId: address.id },
    });

    return plainToInstance(Shipment, newShipment);
  }

  async delete(shipmentId: string): Promise<void> {
    const shipment = await this.findOne(shipmentId);

    if (!shipment) {
      throw new NotFoundException('shipment not found!');
    }

    await this.prisma.shipment.delete({ where: { id: shipment.id } });
  }

  async update(
    shipmentId: string,
    updateShipmentsDto: UpdateShipmentDto,
  ): Promise<Shipment> {
    const shipment: Shipment = await this.findOne(shipmentId);

    const newShipment = await this.prisma.shipment.update({
      where: { id: shipment.id },
      data: { ...updateShipmentsDto },
    });

    return plainToInstance(Shipment, newShipment);
  }

  async findAll(addressId?: string): Promise<Shipment[]> {
    if (addressId) {
      const shipments = await this.prisma.shipment.findMany({
        where: { addressId },
      });

      return plainToInstance(Shipment, shipments);
    }

    const shipments = await this.prisma.shipment.findMany({});

    return plainToInstance(Shipment, shipments);
  }

  async findOne(shipmentId: string): Promise<Shipment> {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id: shipmentId },
    });

    if (!shipment) {
      throw new NotFoundException('shipment not found!');
    }

    return plainToInstance(Shipment, shipment);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post(':addressId')
  create(
    @Param('addressId') addressId: string,
    @Body() createShipmentDto: CreateShipmentDto,
  ) {
    return this.shipmentsService.create(addressId, createShipmentDto);
  }

  @Get()
  findAll(@Query() query: { addressId?: string; shipmentId?: string }) {
    console.log(query);
    return this.shipmentsService.findAll(query.addressId, query.shipmentId);
  }

  @Patch(':shipmentId')
  update(
    @Param('shipmentId') shipmentId: string,
    @Body() updateShipmentDto: UpdateShipmentDto,
  ) {
    return this.shipmentsService.update(shipmentId, updateShipmentDto);
  }

  @Delete(':shipmentId')
  remove(@Param('shipmentId') shipmentId: string) {
    return this.shipmentsService.remove(shipmentId);
  }
}

import {
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateShipmentDto } from './dto/update-shipment.dto';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query(':addressId') addressId: string) {
    return this.shipmentsService.findAll(addressId);
  }

  @Patch(':shipmentId')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('shipmentId') shipmentId: string,
    @Body() updateShipmentDto: UpdateShipmentDto,
  ) {
    return this.shipmentsService.update(shipmentId, updateShipmentDto);
  }

  @Delete(':shipmentId')
  @UseGuards(JwtAuthGuard)
  remove(@Param('shipmentId') shipmentId: string) {
    return this.shipmentsService.remove(shipmentId);
  }
}

import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { AddressModule } from '../address/address.module';
import { PrismaService } from 'src/database/prisma.service';
import { ShipmentsRepository } from './respository/shipments.repository';
import { ShipmentPrismaRepository } from './respository/prisma/shipments.prisma';

@Module({
  imports: [AddressModule],
  controllers: [ShipmentsController],
  exports: [ShipmentsService],
  providers: [
    ShipmentsService,
    PrismaService,
    { provide: ShipmentsRepository, useClass: ShipmentPrismaRepository },
  ],
})
export class ShipmentsModule {}

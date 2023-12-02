import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { AddressModule } from '../addresses/address.module';
import { PrismaService } from 'src/database/prisma.service';
import { ShipmentsRepository } from './repository/shipments.repository';
import { ShipmentPrismaRepository } from './repository/prisma/shipments.prisma';

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

import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AddressRepository } from './repository/address.repository';
import { AddressPrismaRepository } from './repository/prisma/address.prisma.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AddressController],
  providers: [
    AddressService,
    PrismaService,
    { provide: AddressRepository, useClass: AddressPrismaRepository },
  ],
})
export class AddressModule {}

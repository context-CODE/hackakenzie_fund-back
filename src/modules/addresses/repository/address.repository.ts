import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { Address } from '../entities/address.entity';

export abstract class AddressRepository {
  abstract create(
    user: string,
    createAddressDto: CreateAddressDto,
  ): Promise<Address>;
  abstract update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address>;
  abstract delete(id: string): Promise<void>;
  abstract findOne(addressId: string): Promise<Address>;
}

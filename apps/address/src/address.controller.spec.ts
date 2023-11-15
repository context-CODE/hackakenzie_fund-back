import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

describe('AddressController', () => {
  let addressController: AddressController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService],
    }).compile();

    addressController = app.get<AddressController>(AddressController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(addressController.getHello()).toBe('Hello World!');
    });
  });
});

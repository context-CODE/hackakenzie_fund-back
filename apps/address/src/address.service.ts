import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressService {
  getHello(): string {
    return 'Hello World!';
  }
}

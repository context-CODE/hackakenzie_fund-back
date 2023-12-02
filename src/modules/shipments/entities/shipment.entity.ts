import { randomUUID } from 'crypto';
import { Option } from '@prisma/client';
import { Address } from 'src/modules/addresses/entities/address.entity';

export class Shipment {
  readonly id: string;

  fee: GLfloat;
  trackCode?: string | null;
  shippedAt?: Date | null;
  deliveredUntil: Date;
  option: Option;

  readonly address: Address;

  constructor() {
    this.id = randomUUID();
  }
}

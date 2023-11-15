import { randomUUID } from 'crypto';

export class Shipment {
  readonly id: string;

  fee: GLfloat;
  trackCode?: string;
  shippedAt?: Date;
  deliveredUntil: Date;
  option: 'standard' | 'fast';
  addressId: string;

  constructor() {
    this.id = randomUUID();
  }
}

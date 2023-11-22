import { randomUUID } from 'crypto';

export class Shipment {
  readonly id: string;

  fee: GLfloat;
  trackCode?: string | null;
  shippedAt?: Date | null;
  deliveredUntil: Date;
  option: 'standard' | 'fast';
  addressId: string;

  constructor() {
    this.id = randomUUID();
  }
}

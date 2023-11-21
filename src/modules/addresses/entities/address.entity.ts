import { randomUUID } from 'crypto';

export class Address {
  readonly id: string;

  responsible: string;
  district: string;
  zipCode: string;
  street: string;
  city: string;
  state: string;
  number: string;
  complement?: string | null;
  reference?: string | null;
  isDefault: boolean;

  readonly userId: string;

  constructor() {
    this.id = randomUUID();
  }
}

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
  complement: string; // Adicione o '?' para indicar que é opcional.
  reference: string; // Adicione o '?' para indicar que é opcional.
  isDefault: boolean;

  // Relacionamento com o modelo User
  userId: string;

  constructor() {
    this.id = randomUUID();
  }
}

import { $Enums } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  readonly id: string;

  fullName: string;
  email: string;

  @Exclude()
  password: string;
  cpf: string;
  phone: string;
  birthday: string;
  type: $Enums.Type;
  resetToken: string;
  isEmailVerified: boolean;
  confirmationToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor() {
    this.id = randomUUID();
  }
}

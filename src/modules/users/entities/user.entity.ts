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

  @Exclude()
  type: $Enums.Type;

  @Exclude()
  resetToken: string;

  @Exclude()
  isEmailVerified: boolean;

  @Exclude()
  confirmationToken: string;

  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;

  constructor() {
    this.id = randomUUID();
  }
}

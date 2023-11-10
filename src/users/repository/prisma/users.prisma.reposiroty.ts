import { $Enums } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from '../users.repository';

export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: any) {}

  create(createUserDto: CreateUserDto): Promise<{
    id: string;
    fullName: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    birthDate: Date;
    type: $Enums.Type;
    resetToken: string;
    isEmailVarified: boolean;
    cofirmationToken: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<{
    id: string;
    fullName: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    birthDate: Date;
    type: $Enums.Type;
    resetToken: string;
    isEmailVarified: boolean;
    cofirmationToken: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<{
    id: string;
    fullName: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    birthDate: Date;
    type: $Enums.Type;
    resetToken: string;
    isEmailVarified: boolean;
    cofirmationToken: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    updateUserDto: any,
  ): Promise<{
    id: string;
    fullName: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    birthDate: Date;
    type: $Enums.Type;
    resetToken: string;
    isEmailVarified: boolean;
    cofirmationToken: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

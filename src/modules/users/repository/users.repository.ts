import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { TokensDto } from '../dto/tokens.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export abstract class UsersRepository {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findOne(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract findByToken(token: TokensDto): Promise<User | null>;
  abstract setIsEmailVerified(id: string): Promise<void>;
  abstract updateToken(token: TokensDto, userId: string): Promise<void>;
  abstract updatePassword(id: string, password: string): Promise<void>;
}

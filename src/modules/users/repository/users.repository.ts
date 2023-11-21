import { User, Wishlists } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export abstract class UsersRepository {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findOne(id: string, wishlists: boolean): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract update(id: string, updateUserDto: any): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract addProduct(productId: string, userId: string): Promise<Wishlists>;
}

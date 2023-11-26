import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreateResetTokenDto extends PickType(CreateUserDto, ['email']) {}

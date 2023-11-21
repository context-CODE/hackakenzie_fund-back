import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmptyString } from 'src/common/decorators/isNoEmptyString.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmptyString()
  resetToken: string;

  @IsNotEmptyString()
  confirmationToken: string;
}

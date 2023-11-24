import { IsNotEmptyString } from '../decorators/isNoEmptyString.decorator';

export class MessageDto {
  @IsNotEmptyString()
  readonly message: string;
}

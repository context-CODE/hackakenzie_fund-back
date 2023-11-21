import { IsNotEmptyString } from '../decorators/is-not-empty-string.decorator';

export class MessageDto {
  @IsNotEmptyString()
  readonly message: string;
}

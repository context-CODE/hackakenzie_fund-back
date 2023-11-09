import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdDto {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}

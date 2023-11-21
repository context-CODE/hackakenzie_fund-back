import { IsOptional } from 'class-validator';
import { IsCardinal } from '../decorators/is-cardinal.decorator';

export class PaginationDto {
  @IsOptional()
  @IsCardinal()
  readonly limit: number;

  @IsOptional()
  @IsCardinal()
  readonly offset: number;
}

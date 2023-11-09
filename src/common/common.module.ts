import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  Module,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { VALIDATION_PIPE_OPTIONS } from './util/common.constants';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(VALIDATION_PIPE_OPTIONS),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class CommonModule {}

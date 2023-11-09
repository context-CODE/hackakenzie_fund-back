import { ValidationPipeOptions } from '@nestjs/common';

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  transformOptions: {
    groups: ['transform'],
    // enableImplicitConversion: true,
  },
};

export const DEFAULT_PAGINATION_SIZE = {
  USERS: 10,
  ORDERS: 5,
  CATEGORIES: 10,
  PRODUCTS: 20,
} as const satisfies Record<string, number>;

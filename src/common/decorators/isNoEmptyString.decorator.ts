import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString, ValidationOptions } from 'class-validator';

/**
 * Checks if the value is not a empty string.
 */
export const IsNotEmptyString = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  applyDecorators(IsString(validationOptions), IsNotEmpty(validationOptions));

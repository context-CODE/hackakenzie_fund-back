import { NestFactory } from '@nestjs/core';
import { AddressModule } from './address.module';

async function bootstrap() {
  const app = await NestFactory.create(AddressModule);
  await app.listen(3000);
}
bootstrap();

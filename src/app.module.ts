import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from './common/common.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ImagesModule } from './modules/images/images.module';
import { AddressModule } from './modules/address/address.module';
import { ShipmentsModule } from './modules/shipments/shipments.module';

@Module({
  imports: [
    CommonModule,
    CategoriesModule,
    UsersModule,
    CloudinaryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ImagesModule,
    AddressModule,
    ShipmentsModule,
  ],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

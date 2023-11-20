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
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    CategoriesModule,
    UsersModule,
    CloudinaryModule,
    ImagesModule,
    AddressModule,
    ProductsModule,
    AuthModule,
    WishlistsModule,
  ],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

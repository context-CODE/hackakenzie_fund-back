import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from './common/common.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ImagesModule } from './modules/images/images.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailServerModule } from './modules/mail-server/mail-server.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    CategoriesModule,
    UsersModule,
    CloudinaryModule,
    ImagesModule,
    ProductsModule,
    AuthModule,
    MailServerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

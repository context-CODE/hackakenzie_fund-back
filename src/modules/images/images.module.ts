import { Module, forwardRef } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ImagesRepository } from './repositories/images.repository';
import { ImagesPrismaRepository } from './repositories/prisma/images-prisma.repository';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [CloudinaryModule, forwardRef(() => ProductsModule)],
  exports: [ImagesService],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    PrismaService,
    {
      provide: ImagesRepository,
      useClass: ImagesPrismaRepository,
    },
  ],
})
export class ImagesModule {}

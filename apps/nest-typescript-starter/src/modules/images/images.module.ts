import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ImagesRepository } from './repositories/images.repository';
import { ImagesPrismaRepository } from './repositories/prisma/images-prisma.repository';

@Module({
  imports: [CloudinaryModule],
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

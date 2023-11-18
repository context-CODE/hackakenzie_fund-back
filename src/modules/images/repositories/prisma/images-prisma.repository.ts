import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Image } from '../../entities/image.entity';
import { ImagesRepository } from '../images.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateImageDto } from '../../dto/create-image.dto';
import { UpdateImageDto } from '../../dto/update-image.dto';

@Injectable()
export class ImagesPrismaRepository implements ImagesRepository {
  constructor(private prisma: PrismaService) {}
  async createOne(data: CreateImageDto, productId: string): Promise<Image> {
    const image = new Image();

    Object.assign(image, {
      ...data,
    });

    const newImage = await this.prisma.image.create({
      data: {
        ...image,
        productId,
      },
    });

    return plainToInstance(Image, newImage);
  }

  async createMany(
    data: CreateImageDto[],
    productId: string,
  ): Promise<Image[]> {
    const newImages = new Array(data.length).fill({});

    data.forEach((img, index) => {
      newImages[index] = new Image();

      Object.assign(newImages[index], {
        ...img,
        productId,
      });
    });

    await this.prisma.image.createMany({
      data: newImages,
    });

    return plainToInstance(Image, newImages);
  }

  async findOne(id: string): Promise<Image> {
    const image = await this.prisma.image.findUnique({
      where: { id },
    });

    return plainToInstance(Image, image);
  }

  async update(data: UpdateImageDto, id: string): Promise<Image> {
    const image = await this.prisma.image.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Image, image);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.image.delete({
      where: { id },
    });
  }
}

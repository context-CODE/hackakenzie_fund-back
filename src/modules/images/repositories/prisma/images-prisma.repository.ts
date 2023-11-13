import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Image } from '../../entities/image.entity';
import { PrismaService } from 'src/database/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ImagesRepository } from '../images.repository';
import { CreateImageDto } from '../../dto/create-image.dto';
import { UpdateImageDto } from '../../dto/update-image.dto';
import { DEFAULT_PAGINATION_SIZE } from 'src/common/util/common.constants';

@Injectable()
export class ImagesPrismaRepository implements ImagesRepository {
  constructor(private prisma: PrismaService) {}
  async createOne(data: CreateImageDto): Promise<Image> {
    const image = new Image();

    Object.assign(image, {
      ...data,
    });

    const newImage = await this.prisma.image.create({
      data: { ...image },
    });

    return plainToInstance(Image, newImage);
  }

  async createMany(data: CreateImageDto[]): Promise<Image[]> {
    const images = new Array(data.length).fill({});

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newImages = images.map((img) => new Image());

    data.forEach((img, index) => {
      Object.assign(newImages[index], {
        ...img,
      });
    });

    await this.prisma.image.createMany({
      data: newImages,
    });

    return plainToInstance(Image, newImages);
  }

  async findAll(paginationDto: PaginationDto): Promise<Image[]> {
    const { limit, offset } = paginationDto;

    const images = await this.prisma.image.findMany({
      skip: offset,
      take: limit ?? DEFAULT_PAGINATION_SIZE.IMAGES,
    });

    return plainToInstance(Image, images);
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

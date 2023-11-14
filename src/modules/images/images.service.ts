import { randomBytes } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { MessageDto } from 'src/common/dto/message.dto';
import { ImagesRepository } from './repositories/images.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CLOUDINARY_FOLDERS } from '../cloudinary/utils/cloudinary-constants';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class ImagesService {
  constructor(
    private imagesRepository: ImagesRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async createOne(
    file: Express.Multer.File,
    { title, isCover }: CreateImageDto,
  ) {
    try {
      const filename = file.originalname.split('.')[0];
      const cloudinaryId = randomBytes(8).toString('hex');

      const { secure_url } = await Promise.resolve(
        this.cloudinaryService.uploadFile(
          file,
          cloudinaryId,
          filename,
          CLOUDINARY_FOLDERS.SAMPLES,
        ),
      );

      const promise = {
        title,
        isCover,
        cloudinaryId,
        path: secure_url,
      };

      const image = await Promise.resolve(promise);

      return this.imagesRepository.createOne(image);
    } catch (error) {
      return new ExceptionsHandler(error);
    }
  }

  async createMany(files: Array<Express.Multer.File>, data: CreateImageDto[]) {
    try {
      const promises = files.map(async (file, index) => {
        const filename = file.originalname.split('.')[0];
        const cloudinaryId = randomBytes(8).toString('hex');
        const isCoverValid = /true/.test(`${data[index].isCover}`)
          ? true
          : false;

        const { secure_url } = await Promise.resolve(
          this.cloudinaryService.uploadFile(
            file,
            cloudinaryId,
            filename,
            CLOUDINARY_FOLDERS.SAMPLES,
          ),
        );

        return {
          cloudinaryId,
          path: secure_url,
          isCover: isCoverValid,
          title: data[index].title,
        };
      });

      const images = await Promise.all(promises);

      return this.imagesRepository.createMany(images);
    } catch (error) {
      console.log(error);
      return new ExceptionsHandler(error);
    }
  }

  async findOne(id: string) {
    const image = await this.imagesRepository.findOne(id);

    if (!image) throw new NotFoundException('Image not found');

    return image;
  }

  async update(id: string, data: UpdateImageDto) {
    const image = await this.findOne(id);

    return await this.imagesRepository.update(data, image.id);
  }

  async remove(id: string): Promise<MessageDto> {
    const image = await this.findOne(id);

    await this.cloudinaryService.destroy(
      image.cloudinaryId,
      CLOUDINARY_FOLDERS.SAMPLES,
    );
    await this.imagesRepository.remove(id);

    return { message: `Image ${image.title} deleted` };
  }
}

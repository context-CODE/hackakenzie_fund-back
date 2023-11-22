import { randomBytes } from 'crypto';
import {
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { IdDto } from 'src/common/dto/id.dto';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { MessageDto } from 'src/common/dto/message.dto';
import { ProductsService } from '../products/products.service';
import { ImagesRepository } from './repositories/images.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CLOUDINARY_FOLDERS } from '../cloudinary/utils/cloudinary-constants';

@Injectable()
export class ImagesService {
  constructor(
    private imagesRepository: ImagesRepository,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}
  async createOne(
    file: Express.Multer.File,
    { title, isCover }: CreateImageDto,
    product: IdDto,
  ) {
    try {
      await this.productsService.findOne(product.id);

      const filename = file.originalname.split('.')[0];
      const cloudinaryId = randomBytes(8).toString('hex');

      const { secure_url } = await Promise.resolve(
        this.cloudinaryService.uploadFile(
          file,
          cloudinaryId,
          filename,
          CLOUDINARY_FOLDERS.PRODUCTS,
        ),
      );

      const promise = {
        title,
        isCover,
        cloudinaryId,
        path: secure_url,
        productId: product.id,
      };

      const image = await Promise.resolve(promise);

      return this.imagesRepository.createOne(image, product.id);
    } catch (error) {
      return error.response;
    }
  }

  async createMany(
    files: Array<Express.Multer.File>,
    data: CreateImageDto[],
    product: IdDto,
  ) {
    try {
      await this.productsService.findOne(product.id);

      const promises = files.map(async (file, index) => {
        const filename = file.originalname.split('.')[0];
        const cloudinaryId = randomBytes(8).toString('hex');
        const isCoverValid = !!/true/.test(`${data[index].isCover}`);

        const { secure_url } = await Promise.resolve(
          this.cloudinaryService.uploadFile(
            file,
            cloudinaryId,
            filename,
            CLOUDINARY_FOLDERS.PRODUCTS,
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

      return this.imagesRepository.createMany(images, product.id);
    } catch (error) {
      return error.response;
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

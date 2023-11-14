import { Image } from '../entities/image.entity';
import { CreateImageDto } from '../dto/create-image.dto';
import { UpdateImageDto } from '../dto/update-image.dto';

export abstract class ImagesRepository {
  abstract createOne(data: CreateImageDto): Promise<Image>;
  abstract createMany(data: CreateImageDto[]): Promise<Image[]>;
  abstract findOne(id: string): Promise<Image | null>;
  abstract update(data: UpdateImageDto, id: string): Promise<Image>;
  abstract remove(id: string): Promise<void>;
}

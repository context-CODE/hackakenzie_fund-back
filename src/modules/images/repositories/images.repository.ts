import { Image } from '../entities/image.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateImageDto } from '../dto/create-image.dto';
import { UpdateImageDto } from '../dto/update-image.dto';

export abstract class ImagesRepository {
  abstract createOne(data: CreateImageDto): Promise<Image>;
  abstract createMany(data: CreateImageDto[]): Promise<Image[]>;
  abstract findAll(paginationDto: PaginationDto): Promise<Image[]>;
  abstract findOne(id: string): Promise<Image | null>;
  abstract update(data: UpdateImageDto, id: string): Promise<Image>;
  abstract remove(id: string): Promise<void>;
}

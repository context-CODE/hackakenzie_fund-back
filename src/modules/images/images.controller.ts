import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  UploadedFiles,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { IdDto } from 'src/common/dto/id.dto';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { imageOptions } from './helpers/file-filter.helper';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', imageOptions))
  createOne(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateImageDto,
  ) {
    return this.imagesService.createOne(file, data);
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('images', 5, imageOptions))
  createMany(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() { data }: { data: CreateImageDto[] },
  ) {
    return this.imagesService.createMany(files, data);
  }

  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.imagesService.remove(id);
  }
}

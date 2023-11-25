import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { IdDto } from 'src/common/dto/id.dto';
import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { imageOptions } from './helpers/file-filter.helper';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  RequestOneImageDto,
  RequestMultiImagesDto,
} from './dto/request-image.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', imageOptions))
  createOne(
    @UploadedFile() file: Express.Multer.File,
    @Body() { data }: { data: string },
  ) {
    const imageData: RequestOneImageDto = JSON.parse(data);

    return this.imagesService.createOne(
      file,
      imageData.image,
      imageData.product,
    );
  }

  @Post('uploads')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images', 5, imageOptions))
  createMany(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() { data }: { data: string },
  ) {
    const imagesData: RequestMultiImagesDto = JSON.parse(data);
    return this.imagesService.createMany(
      files,
      imagesData.images,
      imagesData.product,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param() { id }: IdDto) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param() { id }: IdDto, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(id, updateImageDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  remove(@Param() { id }: IdDto) {
    return this.imagesService.remove(id);
  }
}

import { BadRequestException, ParseFilePipe } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  const mimeRegex = /^image\/(jpeg|png|gif|jpg|webp)$/;

  if (!mimeRegex.test(file.mimetype))
    return callback(
      new BadRequestException(`File ${file.originalname} is not an image`),
      false,
    );

  callback(null, true);
};

export const imageOptions: MulterOptions = {
  limits: { fileSize: 5242880 },
  fileFilter,
};

export const countFilesPipe = new ParseFilePipe({
  validators: [],
  fileIsRequired: true,
  errorHttpStatusCode: 400,
});

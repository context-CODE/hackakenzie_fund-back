import { Injectable } from '@nestjs/common';
import * as streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response.type';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    cloudinaryId: string,
    name: string,
    folder: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          type: 'upload',
          filename_override: name,
          public_id: cloudinaryId,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async destroy(cloudinaryId: string, folder: string): Promise<void> {
    try {
      cloudinary.uploader.destroy(`${folder}/${cloudinaryId}`, {
        resource_type: 'image',
      });
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }
}

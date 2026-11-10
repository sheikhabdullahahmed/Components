import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { StorageService, type StoredFile } from './storage.service.js';

@Injectable()
export class CloudinaryStorageService extends StorageService {
  constructor(config: ConfigService) {
    super();
    cloudinary.config({
      cloud_name: config.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: config.get<string>('CLOUDINARY_API_KEY'),
      api_secret: config.get<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }

  upload(file: Buffer, folder: string): Promise<StoredFile> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder, resource_type: 'image' }, (error, result) => {
          if (error || !result) {
            reject(new InternalServerErrorException('Could not upload the file'));
            return;
          }
          resolve({ url: result.secure_url, key: result.public_id });
        })
        .end(file);
    });
  }

  async delete(key: string) {
    await cloudinary.uploader.destroy(key, { resource_type: 'image' });
  }
}

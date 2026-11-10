import { Module } from '@nestjs/common';
import { CloudinaryStorageService } from './cloudinary-storage.service.js';
import { StorageService } from './storage.service.js';

@Module({
  providers: [{ provide: StorageService, useClass: CloudinaryStorageService }],
  exports: [StorageService],
})
export class StorageModule {}

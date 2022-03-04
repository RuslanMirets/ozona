import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { uploadProvider } from './upload.provider';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, ...uploadProvider],
})
export class UploadModule {}

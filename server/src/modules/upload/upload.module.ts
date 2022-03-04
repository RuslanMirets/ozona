import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { uploadProvider } from './upload.provider';

@Module({
  controllers: [UploadController],
  providers: [...uploadProvider],
})
export class UploadModule {}

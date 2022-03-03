import { CreateUploadDto } from './dto/create-upload.dto';
import { Upload } from './models/upload.model';
import { UPLOAD_REPOSITORY } from './../../core/constants/index';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor(@Inject(UPLOAD_REPOSITORY) private readonly uploadRepository: typeof Upload) {}

  async create(images) {
    return await this.uploadRepository.create(images);
  }
}

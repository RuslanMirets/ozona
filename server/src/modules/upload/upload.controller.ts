import { UploadService } from './upload.service';
import { Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export const storage = {
  storage: diskStorage({
    destination: './uploads/productimages',
    filename: (req, file, callback) => {
      const filename = uuidv4();
      const extension = file.originalname.split('.').pop();
      callback(null, `${filename}.${extension}`);
    },
  }),
};

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', undefined, storage))
  create(@UploadedFiles() files: Array<Express.Multer.File>) {
    return of(files.map((file) => file.filename));
  }

  @Get('product-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), 'uploads/productimages/' + imagename)));
  }
}

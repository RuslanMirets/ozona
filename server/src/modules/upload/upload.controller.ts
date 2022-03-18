import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export const storage = {
  storage: diskStorage({
    destination: './uploads/avatar',
    filename: (req, file, callback) => {
      const filename = uuidv4();
      const extension = file.originalname.split('.').pop();
      callback(null, `${filename}.${extension}`);
    },
  }),
};

@Controller('upload')
export class UploadController {
  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar', storage))
  create(@UploadedFile() file: Express.Multer.File) {
    return of(file);
  }

  @Get('avatar/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), 'uploads/avatar/' + imagename)));
  }
}

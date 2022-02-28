import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFiles,
  Param,
  Res,
  Request,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { Observable, of } from 'rxjs';

export const storage = {
  storage: diskStorage({
    destination: './uploads/productimages',
    filename: (req, files, callback) => {
      // const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const filename = uuidv4();
      const extension: string = path.parse(files.originalname).ext;

      callback(null, `${filename}${extension}`);
    },
  }),
};

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', undefined, storage))
  create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() dto: CreateProductDto) {
    return this.productService.create(
      dto,
      files.map((file) => file.filename),
    );
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.productService.findOneById(+id);
  }

  @Get('product-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), 'uploads/productimages/' + imagename)));
  }
}

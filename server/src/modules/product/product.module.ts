import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productProvider } from './product.provider';

@Module({
  providers: [ProductService, ...productProvider],
  controllers: [ProductController],
})
export class ProductModule {}

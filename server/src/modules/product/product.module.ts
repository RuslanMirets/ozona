import { DatabaseModule } from './../../core/database/database.module';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productProvider } from './product.provider';

@Module({
  imports: [DatabaseModule],
  providers: [ProductService, ...productProvider],
  controllers: [ProductController],
})
export class ProductModule {}

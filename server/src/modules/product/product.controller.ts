import { ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Post, Get, Param } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') _id: string): Promise<ProductDocument | null> {
    return this.productService.findOneById(_id);
  }
}

import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Post, Get } from '@nestjs/common';

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
}

import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Controller, Post, Get, Body, Param } from '@nestjs/common';

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
  findOneById(@Param('id') id: string) {
    return this.productService.findOneById(+id);
  }
}

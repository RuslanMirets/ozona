import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './models/product.model';
import { PRODUCT_REPOSITORY } from './../../core/constants/index';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return await this.productRepository.create<Product>(dto);
  }

  async findAll() {
    return await this.productRepository.findAll();
  }
}

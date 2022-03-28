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
    return await this.productRepository.findAll({ include: { all: true } });
  }

  async findOneById(id: number) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async sold(id: number, quantity: number, oldInStock: number, oldSold: number) {
    return await this.productRepository.update(
      {
        inStock: oldInStock - quantity,
        sold: quantity + oldSold,
      },
      { where: { id: id } },
    );
  }
}

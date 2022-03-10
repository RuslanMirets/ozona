import { CreateProductDto } from './dto/create-product.dto';
import { ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { PRODUCT_MODEL } from './../../core/constants/index';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(@Inject(PRODUCT_MODEL) private productModel: Model<ProductDocument>) {}

  async create(dto: CreateProductDto): Promise<ProductDocument> {
    return await this.productModel.create(dto);
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOneById(_id: string): Promise<ProductDocument | null> {
    return await this.productModel.findOne({ _id }).exec();
  }
}

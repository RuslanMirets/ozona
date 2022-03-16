import { ProductService } from './../product/product.service';
import { Model } from 'mongoose';
import { ORDER_MODEL } from './../../core/constants/index';
import { Inject, Injectable } from '@nestjs/common';
import { OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_MODEL) private orderModel: Model<OrderDocument>,
    private readonly productService: ProductService,
  ) {}

  async create(dto: CreateOrderDto, userId: string): Promise<OrderDocument> {
    dto.cart.filter((item) => {
      return this.productService.sold(item._id, item.quantity, item.inStock, item.sold);
    });
    return await this.orderModel.create({
      address: dto.address,
      phone: dto.phone,
      cart: dto.cart,
      total: dto.total,
      user: { _id: userId },
    });
  }

  async findAll() {
    return await this.orderModel.find().exec();
  }
}

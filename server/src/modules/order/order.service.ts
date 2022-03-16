import { Model } from 'mongoose';
import { ORDER_MODEL } from './../../core/constants/index';
import { Inject, Injectable } from '@nestjs/common';
import { OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(@Inject(ORDER_MODEL) private orderModel: Model<OrderDocument>) {}

  async create(dto: CreateOrderDto, userId: string): Promise<OrderDocument> {
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

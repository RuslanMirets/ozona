import { JwtAuthGuard } from './../../core/guards/jwt-auth.guard';
import { Model } from 'mongoose';
import { ORDER_MODEL } from './../../core/constants/index';
import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(@Inject(ORDER_MODEL) private orderModel: Model<OrderDocument>) {}

  @UseGuards(JwtAuthGuard)
  async create(dto: CreateOrderDto): Promise<OrderDocument> {
    return await this.orderModel.create(dto);
  }
}

import { User } from './../../user/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User[];

  @Prop({ required: true })
  address: String;

  @Prop({ required: true })
  phone: String;

  @Prop({ required: true })
  cart: String[];

  @Prop({ required: true })
  total: Number;

  @Prop({ required: true, default: false })
  delivered: Boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

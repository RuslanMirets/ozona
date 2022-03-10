import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  title: String;

  @Prop({ required: true, trim: true })
  price: Number;

  @Prop({ required: true })
  description: String;

  @Prop({ required: true })
  images: string[];

  @Prop({ required: true })
  category: String;

  @Prop({ required: true, default: false })
  checked: Boolean;

  @Prop({ required: true, default: 0 })
  inStock: Number;

  @Prop({ required: true, default: 0 })
  sold: Number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

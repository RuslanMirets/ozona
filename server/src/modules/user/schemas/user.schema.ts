import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: false })
  root: Boolean;

  @Prop({ default: 'https://www.pinclipart.com/picdir/big/92-928150_home-2-person-clipart.png' })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

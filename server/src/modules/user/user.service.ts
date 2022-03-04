import { Model } from 'mongoose';
import { USER_MODEL } from './../../core/constants/index';
import { Inject, Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = new this.userModel(dto);
    return user.save();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findOneById(id: string): Promise<User> {
    return await this.userModel.findOne({ id });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}

import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { USER_MODEL } from 'src/core/constants';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(dto);
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findOneById(_id: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ _id }).exec();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }
}

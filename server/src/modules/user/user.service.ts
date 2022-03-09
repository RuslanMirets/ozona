import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { USER_MODEL } from 'src/core/constants';
import { UserDocument } from './schemas/user.schema';
import { IUserDetails } from './interfaces/user-details.interface';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL) private userModel: Model<UserDocument>) {}

  _getUserDetails(user: UserDocument): IUserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      root: user.root,
    };
  }

  async create(name: string, email: string, hashedPassword: string): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findOneById(id: string): Promise<IUserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async findAll() {
    return await this.userModel.find().exec();
  }
}

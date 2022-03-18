import { UpdateInfoDto } from './dto/update-info.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_MODEL } from 'src/core/constants';
import { UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

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

  async resetPassword(userId: string, dto: ResetPasswordDto): Promise<UserDocument | null> {
    const hashedPassword = await this.hashPassword(dto.password);
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, { password: hashedPassword })
      .exec();
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async updateName(userId: string, dto: UpdateInfoDto) {
    const newUser = await this.userModel
      .findOneAndUpdate({ _id: userId }, { name: dto.name })
      .exec();
    return { name: dto.name, avatar: newUser.avatar, email: newUser.email, role: newUser.role };
  }

  async updateAvatar(userId: string, dto: UpdateInfoDto) {
    if (!dto) {
      throw new NotFoundException('Загрузите изображение');
    }
    const newUser = await this.userModel
      .findOneAndUpdate({ _id: userId }, { avatar: dto.filename })
      .exec();
    return { name: newUser.name, avatar: dto.filename, email: newUser.email, role: newUser.role };
  }
}

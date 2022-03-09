import { CreateRoleDto } from './dto/create-role.dto';
import { Model } from 'mongoose';
import { RoleDocument } from './schemas/role.schema';
import { ROLE_MODEL } from './../../core/constants/index';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(@Inject(ROLE_MODEL) private roleModel: Model<RoleDocument>) {}

  async create(dto: CreateRoleDto): Promise<RoleDocument> {
    const newRole = new this.roleModel(dto);
    return newRole.save();
  }

  async findOneByValue(value: string): Promise<RoleDocument | null> {
    return await this.roleModel.findOne({ value }).exec();
  }
}

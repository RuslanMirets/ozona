import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/role.model';
import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY } from 'src/core/constants';

@Injectable()
export class RoleService {
  constructor(@Inject(ROLE_REPOSITORY) private readonly roleRepository: typeof Role) {}

  async create(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  }

  async findAll() {
    return await this.roleRepository.findAll();
  }
}

import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }
}

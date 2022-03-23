import { UserService } from 'src/modules/user/user.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from 'src/core/decorators/role-auth.decorator';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Role('ADMIN')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}

import { RoleGuard } from './../../core/guards/role.guard';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Role } from 'src/core/decorators/role-auth.decorator';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Role('ADMIN')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOneById(req.user.id);
  }
}

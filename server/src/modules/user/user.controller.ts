import { JwtAuthGuard } from './../../core/guards/jwt-auth.guard';
import { UserService } from 'src/modules/user/user.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { IUserDetails } from './interfaces/user-details.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<IUserDetails | null> {
    return this.userService.findOneById(id);
  }
}

import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserService } from 'src/modules/user/user.service';
import { Controller, Get, Param, UseGuards, Request, Patch, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { User } from 'src/core/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOneById(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('resetPassword')
  resetPassword(@User() userId: string, @Body() dto: ResetPasswordDto) {
    return this.userService.resetPassword(userId, dto);
  }
}

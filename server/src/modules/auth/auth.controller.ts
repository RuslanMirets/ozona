import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(DoesUserExist)
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return await this.authService.register(dto);
  }
}

import { LoginUserDto } from './../user/dto/login-user.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IUserDetails } from '../user/interfaces/user-details.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() user: LoginUserDto): Promise<{ user: IUserDetails; token: string } | null> {
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() user: CreateUserDto): Promise<IUserDetails | null> {
    return this.authService.register(user);
  }
}

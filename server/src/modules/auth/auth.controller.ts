import { LoginUserDto } from './../user/dto/login-user.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { IUserDetails } from '../user/interfaces/user-details.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() user: LoginUserDto): Promise<{ user: IUserDetails; token: string } | null> {
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() user: CreateUserDto): Promise<IUserDetails | null> {
    return this.authService.register(user);
  }
}

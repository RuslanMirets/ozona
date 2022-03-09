import { UserDocument } from './../user/schemas/user.schema';
import { LoginUserDto } from './../user/dto/login-user.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() user: LoginUserDto): Promise<{ user: UserDocument; token: string } | null> {
    return this.authService.login(user);
  }

  @UseGuards(DoesUserExist)
  @Post('register')
  register(@Body() user: CreateUserDto): Promise<UserDocument | null> {
    return this.authService.register(user);
  }
}

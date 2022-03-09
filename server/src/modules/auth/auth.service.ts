import { UserDocument } from './../user/schemas/user.schema';
import { LoginUserDto } from './../user/dto/login-user.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;

    const match = await this.comparePassword(password, user.password);
    if (!match) return null;

    return user;
  }

  async login(existingUser: LoginUserDto): Promise<{ user: UserDocument; token: string } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    const jwt = await this.jwtService.signAsync({ user });
    return { user, token: jwt };
  }

  async register(user: CreateUserDto): Promise<UserDocument | any> {
    const pass = await this.hashPassword(user.password);

    const newUser = await this.userService.create({ ...user, password: pass });
    return newUser;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

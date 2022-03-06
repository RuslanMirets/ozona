import { RoleService } from './../role/role.service';
import { LoginUserDto } from './../user/dto/login-user.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserDetails } from '../user/interfaces/user-details.interface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private roleService: RoleService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUserDetails | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;

    const match = await this.comparePassword(password, user.password);
    if (!match) return null;

    return this.userService._getUserDetails(user);
  }

  async login(existingUser: LoginUserDto): Promise<{ user: IUserDetails; token: string } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    const jwt = await this.jwtService.signAsync({ user });
    return { user, token: jwt };
  }

  async register(user: Readonly<CreateUserDto>): Promise<IUserDetails | any> {
    const { name, email, password, roles } = user;

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(name, email, hashedPassword, roles);

    const role = await this.roleService.findOneByValue('USER');
    newUser.roles.push(role.id)
    await newUser.save();

    return this.userService._getUserDetails(newUser);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

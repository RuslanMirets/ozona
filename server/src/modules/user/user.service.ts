import { CreateUserDto } from './dto/create-user.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateInfoDto } from './dto/update-info.dto';

@Injectable()
export class UserService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) {}

  async create(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.create<User>(dto);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email }, include: { all: true } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id }, include: { all: true } });
  }

  async findAll() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async resetPassword(userId: number, dto: ResetPasswordDto) {
    const hashedPassword = await this.hashPassword(dto.password);
    return await this.userRepository.update(
      { password: hashedPassword },
      { where: { id: userId } },
    );
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async updateName(userId: number, dto: UpdateInfoDto) {
    await this.userRepository.update({ name: dto.name }, { where: { id: userId } });

    // return { name: dto.name, avatar: newUser.avatar, email: newUser.email, role: newUser.role };
    return { name: dto.name };
  }

  async updateAvatar(userId: number, dto: UpdateInfoDto) {
    if (!dto) {
      throw new NotFoundException('Загрузите изображение');
    }
    await this.userRepository.update({ avatar: dto.filename }, { where: { id: userId } });

    // return { name: newUser.name, avatar: dto.filename, email: newUser.email, role: newUser.role };
    return { avatar: dto.filename };
  }
}

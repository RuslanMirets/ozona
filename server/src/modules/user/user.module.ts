import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';

@Module({
  providers: [UserService, ...userProvider],
  controllers: [UserController],
})
export class UserModule {}

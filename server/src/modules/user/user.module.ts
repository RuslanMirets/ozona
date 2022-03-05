import { DatabaseModule } from './../../core/database/database.module';
import { Module } from '@nestjs/common';
import { userProvider } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProvider],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

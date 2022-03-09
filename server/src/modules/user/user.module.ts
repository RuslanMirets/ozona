import { DatabaseModule } from './../../core/database/database.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProvider],
  controllers: [UserController],
})
export class UserModule {}

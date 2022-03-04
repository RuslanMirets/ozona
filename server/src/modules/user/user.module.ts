import { DatabaseModule } from './../../core/database/database.module';
import { Module } from '@nestjs/common';
import { userProvider } from './user.provider';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProvider],
})
export class UserModule {}

import { DatabaseModule } from './../../core/database/database.module';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { roleProvider } from './role.provider';

@Module({
  imports: [DatabaseModule],
  providers: [RoleService, ...roleProvider],
  controllers: [RoleController],
})
export class RoleModule {}

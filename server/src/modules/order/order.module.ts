import { DatabaseModule } from './../../core/database/database.module';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProvider } from './order.provider';

@Module({
  imports: [DatabaseModule],
  providers: [OrderService, ...orderProvider],
  controllers: [OrderController],
})
export class OrderModule {}

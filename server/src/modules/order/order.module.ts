import { ProductModule } from './../product/product.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { orderProvider } from './order.provider';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [UserModule, ProductModule],
  providers: [OrderService, ...orderProvider],
  controllers: [OrderController],
})
export class OrderModule {}

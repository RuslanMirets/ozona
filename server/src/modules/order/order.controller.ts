import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { User } from 'src/core/decorators/user.decorator';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateOrderDto, @User() userId: string) {
    return this.orderService.create(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUserOrders(@User() userId: string) {
    return this.orderService.getUserOrders(userId);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.orderService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('delivered/:id')
  deliveredOrder(@Param('id') id: string) {
    return this.orderService.deliveredOrder(id);
  }
}

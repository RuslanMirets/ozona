import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/core/decorators/user.decorator';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateOrderDto, @User() userId: number) {
    return this.orderService.create(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUserOrders(@User() id: number) {
    return this.orderService.getUserOrders(id);
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.orderService.findOneById(id);
  }
}

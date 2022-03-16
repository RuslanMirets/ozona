import { CartDataDto } from './cart-data.dto';
export class CreateOrderDto {
  readonly address: string;
  readonly phone: string;
  readonly cart: CartDataDto[];
  readonly total: number;
  readonly delivered: boolean;
}

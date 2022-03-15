export class CreateOrderDto {
  readonly user: string[];
  readonly address: string;
  readonly phone: string;
  readonly cart: string[];
  readonly total: number;
  readonly delivered: boolean;
}

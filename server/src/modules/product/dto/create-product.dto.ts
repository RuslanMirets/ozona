export class CreateProductDto {
  title: string;
  price: number;
  description: string;
  images: string[];
  inStock?: number;
  sold?: number;
}

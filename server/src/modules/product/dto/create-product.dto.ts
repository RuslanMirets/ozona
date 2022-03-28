export class CreateProductDto {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  inStock?: number;
  sold?: number;
}

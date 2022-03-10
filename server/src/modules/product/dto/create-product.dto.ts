export class CreateProductDto {
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly images: string[];
  readonly category: string;
}

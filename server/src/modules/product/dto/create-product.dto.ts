export class CreateProductDto {
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly content: string;
  readonly images: string[];
  readonly category: string;
}

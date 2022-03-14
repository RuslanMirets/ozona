export interface IProduct {
  _id: string;
  title: string;
  price: number;
  description: string;
  content: string;
  images: IImages[];
  category: string;
  checked: boolean;
  inStock: number;
  sold: number;
  quantity: number;
}

interface IImages {
  url: string;
}

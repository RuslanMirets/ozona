export interface IProduct {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: IImages[];
  category: string;
  checked: boolean;
  inStock: boolean;
  sold: number;
}

interface IImages {
  url: string;
}

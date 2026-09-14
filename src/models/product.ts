interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  category: string;
  stock: number;
  image?: string;
  userId: number;
}

export type { Product };

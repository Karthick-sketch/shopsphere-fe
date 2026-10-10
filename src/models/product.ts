interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  category: string;
  imageUrl?: string;
  userId: number;
}

interface ProductSummary {
  id: number;
  name: string;
  imageUrl?: string;
}

interface ProductInfo {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export type { Product, ProductSummary, ProductInfo };

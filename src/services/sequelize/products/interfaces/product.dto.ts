export interface ProductDTO {
  id: string;
  title: string;
  url: string;
  price: number;
  description: string;
  storeId: string;
}

export interface ProductQueryDTO {
  page?: number;
  limit?: number;
  keyword?: string | null;
  sort?: any;
}

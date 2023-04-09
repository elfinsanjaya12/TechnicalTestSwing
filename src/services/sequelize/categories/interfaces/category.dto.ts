export interface CategoryDTO {
  id: string;
  name: string;
}

export interface CategoryQueryDTO {
  page: number;
  limit: number;
  keyword: string;
}

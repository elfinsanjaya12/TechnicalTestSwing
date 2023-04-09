export interface StoreDTO {
  id?: string;
  name: string;
  url: string;
  address: string;
  phone: string;
  operationalTimeStart: number;
  operationalTimeEnd: number;
}

export interface StoreQueryDTO {
  page: number;
  limit: number;
  keyword: string;
}

export interface ProductRequest {
  search?: string;
}

export interface ProductReducer {
  loading: boolean;
  frameUrl?: string;
  data?: CardProduct[];
}

export interface CardProduct {
  id: number;
  title: string;
  cards: Product[];
}

export interface Product {
  id: number;
  solution?: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  url: string;
  notification?: string | number;
}

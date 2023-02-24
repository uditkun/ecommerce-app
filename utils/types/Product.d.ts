export type Product = {
  id: number;
  companyName: string;
  name: string;
  price: number;
  offers?: number;
  imgSrc: string;
  discount?: number;
  rating?: number;
};

export type CartProduct = {
  id: number;
  companyName: string;
  name: string;
  price: number;
  offers?: number;
  imgSrc: string;
  discount?: number;
  rating?: number;
  quantity: number;
};

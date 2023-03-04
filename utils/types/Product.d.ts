export type Product = {
  id: number;
  orderId: string;
  companyName: string;
  name: string;
  price: number;
  imgSrc: string;
  discount?: number;
  rating?: number;
  couponId?: string;
};

export type CartProduct = {
  id: number;
  orderId: string;
  companyName: string;
  name: string;
  price: number;
  imgSrc: string;
  discount?: number;
  rating?: number;
  quantity: number;
  couponId?: string;
};

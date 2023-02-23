// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type LocalProduct = {
  id: number;
  companyName: string;
  href: string;
  name: string;
  price: string;
  offers: number;
  imgSrc: string;
  rating: number;
  discount: number;
};

const productsList: LocalProduct[] = [
  {
    id: 2,
    companyName: "DEF",
    href: "product_2",
    name: "Product 2",
    price: "$20",
    offers: 2,
    discount: 20,
    imgSrc: "/placeholder.png",
    rating: 4.3,
  },
  {
    id: 1,
    companyName: "ABC",
    href: "product_1",
    name: "Product 1",
    price: "$10",
    offers: 1,
    imgSrc: "/placeholder.png",
    discount: 10,
    rating: 4.13,
  },
  {
    id: 3,
    companyName: "GHI",
    href: "product_3",
    name: "Product 3",
    price: "$30",
    offers: 1,
    imgSrc: "/placeholder.png",
    discount: 25,
    rating: 4.2,
  },
  {
    id: 4,
    companyName: "JKL",
    href: "product_4",
    name: "Product 4",
    price: "$40",
    offers: 1,
    imgSrc: "/placeholder.png",
    rating: 4.3,
    discount: 15,
  },
  {
    id: 5,
    companyName: "MNO",
    href: "product_5",
    name: "Product 5",
    price: "$50",
    offers: 2,
    imgSrc: "/placeholder.png",
    rating: 4.0,
    discount: 30,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const product = productsList.filter((item: LocalProduct) =>
    item.name.toLowerCase().includes(String(req.query.product).toLowerCase())
  );

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json("404 Not Found");
  }

  //   res.status(200).json(productsList);
  //   res.status(200).json(req.query);
}

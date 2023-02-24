// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../utils/types/Product";
import productsList from "../../../utils/productsList";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const product = productsList.filter((item: Product) =>
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

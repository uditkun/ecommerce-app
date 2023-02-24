// import path from "path";
// import fs from "fs";
import productsList from "./productsList";

const getLocalProducts = () => {
  // const productsDir = path.join(process.cwd(), "dummyDB");
  // // const productsListName = fs.readdirSync(productsDir).toString();
  // const products = JSON.parse(
  //   fs.readFileSync(path.join(productsDir, "products.json"), "utf-8")
  // );
  // // console.log(products);
  return productsList;
};

export { getLocalProducts };

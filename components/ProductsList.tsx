import Link from "next/link";
import { getHref } from "../utils/helperFunctions";
import ProductCard from "./ProductCard";
import useWishList from "../hooks/useWishList";

const ProductsList = ({ queryData }: { queryData: any }) => {
  const { data: products, isLoading, isError } = queryData;
  const wishlist = useWishList();

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {products?.length ? (
        products.map((product: any) => (
          <Link href={"/products/" + getHref(product.name)} key={product.id}>
            <ProductCard details={product} wishlistHandlers={wishlist} />
          </Link>
        ))
      ) : (
        <div>Product not found</div>
      )}
    </>
  );
};

export default ProductsList;

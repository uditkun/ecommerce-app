import { QueryDocumentSnapshot } from "firebase/firestore";
import Link from "next/link";
import { QueriesResults, Query } from "react-query";
import { QueryState } from "react-query/types/core/query";
import { getHref } from "../utils/handleForms";
import ProductCard from "./ProductCard";

const ProductsList = ({ queryData }: { queryData: any }) => {
  const { data: products, isLoading, isError } = queryData;

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
            <ProductCard details={product} />
          </Link>
        ))
      ) : (
        <div>Product not found</div>
      )}
    </>
  );
};

export default ProductsList;

import Link from "next/link";
import ProductCard from "./ProductCard";

const ProductsList = ({ queryData }: any) => {
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
          <Link href={"/products/" + product.href} key={product.id}>
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

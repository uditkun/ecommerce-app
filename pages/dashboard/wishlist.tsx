import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import useProductSearch from "../../hooks/useProductSearch";
import { useGlobalState } from "../../components/Context";
import Link from "next/link";
import { useRouter } from "next/router";
import { getHref } from "../../utils/handleForms";
import { Product } from "../../utils/types/Product";

function Wishlist() {
  const router = useRouter();
  const {
    queryData: { data, isFetched },
    setSearchValue,
  } = useProductSearch();

  const { auth } = useGlobalState();

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
    setSearchValue(" ");
  }, [auth, router, setSearchValue]);

  const products: Product[] = auth?.wishlist?.map((item: Product) => {
    return data?.find((product: Product) => product.id === item.id);
  });

  return (
    <section className="p-8">
      <h3 className="text-xl font-bold mb-4">Wishlist</h3>
      <div className="grid gap-6 grid-cols-auto-1x lg:grid-cols-auto-2x">
        {isFetched && products?.length ? (
          products?.map((card: Product) => (
            <Link href={"/products/" + getHref(card.name)} key={card.id}>
              <ProductCard details={card} />
            </Link>
          ))
        ) : (
          <p>Add some items to wishlist</p>
        )}
      </div>
    </section>
  );
}

export default Wishlist;

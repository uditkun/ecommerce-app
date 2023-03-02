import React from "react";
import ProductCard from "../../components/ProductCard";
import { useGlobalState } from "../../components/Context";
import Link from "next/link";
import { getHref } from "../../utils/handleForms";
import { Product } from "../../utils/types/Product";
import usePageAuth from "../../hooks/usePageAuth";
import useWishList from "../../hooks/useWishList";

function Wishlist() {
  usePageAuth();
  const {
    user: { wishlist: wishlist },
  } = useGlobalState();
  const wishlistFunctions = useWishList();

  return (
    <section className="p-8">
      <h3 className="text-xl font-bold mb-4">Wishlist</h3>
      <div className="grid gap-6 grid-cols-auto-1x lg:grid-cols-auto-2x">
        {wishlist?.length ? (
          wishlist?.map((card: Product) => (
            <Link href={"/products/" + getHref(card.name)} key={card.id}>
              <ProductCard
                details={card}
                wishlistHandlers={wishlistFunctions}
              />
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

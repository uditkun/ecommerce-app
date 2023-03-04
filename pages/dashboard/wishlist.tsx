import ProductCard from "../../components/ProductCard";
import { useGlobalState } from "../../components/Context";
import Link from "next/link";
import { getHref } from "../../utils/helperFunctions";
import { Product } from "../../utils/types/Product";
import usePageAuth from "../../hooks/usePageAuth";
import useWishList from "../../hooks/useWishList";

function Wishlist() {
  usePageAuth();
  const {
    user: { wishlist },
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
          <>
            <p>Add some items to wishlist</p>
          </>
        )}
      </div>
      {!wishlist?.length && (
        <Link
          href="/"
          className="py-2 px-4 bg-slate-600 text-white mt-5 block max-w-fit rounded"
        >
          Go to shop
        </Link>
      )}
    </section>
  );
}

export default Wishlist;

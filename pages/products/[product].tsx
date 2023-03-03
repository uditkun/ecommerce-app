import Image from "next/image";
import { useRouter } from "next/router";
import {
  useGlobalState,
  useDispatchGlobalState,
} from "../../components/Context";
import WishlistHeart from "../../components/WishlistHeart";
import { Product } from "../../utils/types/Product";
import { getHref } from "../../utils/helperFunctions";
import productsList from "../../utils/productsList";
import useCustomFireHooks from "../../hooks/useCustomFireHooks";
import useWishList from "../../hooks/useWishList";

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const product = productsList.filter(
    (item: Product) => getHref(item.name) === params.product
  )[0];

  if (product) {
    return {
      props: {
        product,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

function ProductPage({ product }: any) {
  const router = useRouter();
  const {
    user: { cart: cart },
  } = useGlobalState();
  const dispatch = useDispatchGlobalState();
  const { updateUserArrayData } = useCustomFireHooks();
  const wishlist = useWishList();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <section className="flex flex-col lg:flex-row gap-6 lg:gap-14 md:pl-24 lg:pl-8 px-4 pt-4 sm:px-8 sm:pt-8 max-w-7xl">
      <div>
        <div className="relative w-fit">
          <Image
            className="rounded"
            src={product.imgSrc}
            alt="placeholder"
            width={600}
            height={400}
          />
          <WishlistHeart
            product={product}
            customCSS="right-2 top-2 p-3"
            size="lg"
            wishlistHandlers={wishlist}
          />
        </div>
        <div className="flex gap-4 mt-6 max-w-[600px]">
          <button
            onClick={() => {
              let isProductInCart = cart?.find(
                (i: Product) => i?.id === product?.id
              );
              if (isProductInCart) {
                updateUserArrayData({
                  title: "cart",
                  operation: "remove",
                  data: product,
                });
                console.log("removed from cart");
              } else {
                updateUserArrayData({
                  title: "cart",
                  operation: "add",
                  data: product,
                });
                console.log("added to cart");
              }
            }}
            className="py-3 px-4 bg-orange-400 text-white font-semibold rounded cursor-pointer flex-1"
          >
            {cart?.find((i: any) => i?.id === product?.id)
              ? "Remove from Cart"
              : "Add to Cart"}
          </button>
          <button
            onClick={() => {
              updateUserArrayData({
                title: "checkout",
                operation: "add",
                data: { ...product, quantity: 1 },
              });
              router.push("/checkout");
            }}
            className="py-3 px-4 bg-green-500 text-white font-semibold rounded cursor-pointer flex-1"
          >
            Buy Now
          </button>
        </div>
      </div>
      <div className="flex-1 ml-2 sm:ml-0">
        <span className="text-md text-gray-600 font-semibold">
          {product.companyName}
        </span>
        <h3 className="font-semibold text-[28px] text-gray-800 mb-2">
          {product.name}
        </h3>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">{product.price}</span>
          <span>{product.rating}</span>
        </div>

        <div className="flex flex-col">
          <span>{product.delivery}</span>
          <p>
            <span>{product.offers}</span> Offers Available
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;

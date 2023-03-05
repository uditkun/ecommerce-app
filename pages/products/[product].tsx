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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { redirectForPayment } from "../../utils/stripe-helpers";

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
  const { auth, user } = useGlobalState();
  const dispatch = useDispatchGlobalState();
  const { updateUserArrayData } = useCustomFireHooks();
  const wishlist = useWishList();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <section className="flex flex-col lg:flex-row gap-6 lg:gap-14 md:pl-24 lg:pl-8 px-4 sm:px-8 sm:pt-4 max-w-7xl">
      <div className="mx-auto">
        <div className="relative max-w-[500px]">
          <Image
            className="rounded"
            src={product.imgSrc}
            alt="placeholder"
            width={500}
            height={350}
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
              if (!auth.uid) {
                router.push("/login");
                return;
              }
              let isProductInCart = user?.cart?.find(
                (i: Product) => i?.id === product?.id
              );
              if (isProductInCart) {
                updateUserArrayData({
                  title: "cart",
                  operation: "remove",
                  data: product,
                });
              } else {
                updateUserArrayData({
                  title: "cart",
                  operation: "add",
                  data: product,
                });
              }
            }}
            className="py-3 px-4 bg-orange-400 text-white font-semibold rounded cursor-pointer flex-1"
          >
            {user?.cart?.find((i: any) => i?.id === product?.id)
              ? "Remove from Cart"
              : "Add to Cart"}
          </button>
          <button
            onClick={() => {
              if (!auth.uid) {
                router.push("/login");
                return;
              }
              redirectForPayment([{ orderId: product.orderId }], user?.email);
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
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold">${product.price}</span>
          <span className="font-bold">
            <FontAwesomeIcon
              className="mr-1 text-yellow-400"
              size="lg"
              icon={faStar}
            ></FontAwesomeIcon>
            <span
              className={
                product.rating > 4
                  ? "bg-green-700 text-white py-1 px-2 rounded"
                  : "bg-orange-400 text-black py-1 px-2 rounded"
              }
            >
              {product.rating}
            </span>
          </span>
        </div>
        <span>{product.delivery}</span>
      </div>
    </section>
  );
}

export default ProductPage;

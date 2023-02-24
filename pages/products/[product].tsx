import Image from "next/image";
import { getLocalProducts } from "../../utils/getLocalProducts";
import { useRouter } from "next/router";
import {
  useGlobalState,
  useDispatchGlobalState,
  ACTIONS,
} from "../../components/Context";
import WishlistHeart from "../../components/WishlistHeart";
import { Product } from "../../utils/types/Product";
import { getHref } from "../../utils/handleForms";

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = ({ params }: any) => {
  // const products = await fetch(
  //   `https://jsonplaceholder.typicode.com/posts/${params.product}`
  // );
  // const data = await products.json();
  // console.log(data);
  // return {
  //   props: { data },
  // };
  const products = getLocalProducts();
  const product = products.filter(
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
  const { cart, auth } = useGlobalState();
  const dispatch = useDispatchGlobalState();

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
            id={product.id}
            customCSS="right-2 top-2 p-3"
            size="lg"
          />
        </div>
        <div className="flex gap-4 mt-6 max-w-[600px]">
          <button
            onClick={() => {
              let isProductInCart = cart?.find(
                (i: Product) => i?.id === product?.id
              );
              if (isProductInCart) {
                dispatch({
                  type: ACTIONS.REMOVE_FROM_CART,
                  payload: product?.id,
                });
              } else {
                dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
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
              if (!auth) {
                router.push("/login");
                return;
              }
              dispatch({ type: ACTIONS.ADD_TO_CHECKOUT, payload: product });
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

import { useRouter } from "next/router";
import { useGlobalState } from "../components/Context";
import { Product } from "../utils/types/Product";
import useCustomFireHooks from "./useCustomFireHooks";

const useWishList = () => {
  const { auth, user } = useGlobalState();
  const router = useRouter();
  const { updateUserArrayData } = useCustomFireHooks();

  const isOnWishlist = (id: number): boolean => {
    return Boolean(user?.wishlist?.find((item: Product) => item.id === id));
  };

  const isOnWishlistCSS = (id: number, customCSS?: string): string => {
    return isOnWishlist(id)
      ? `wishlist wishlist_active ${customCSS}`
      : `wishlist ${customCSS}`;
  };

  const removeFromWishlist = (product: Product) => {
    updateUserArrayData({
      title: "wishlist",
      operation: "remove",
      data: product,
    });
  };
  const addToWishlist = (product: Product) => {
    updateUserArrayData({ title: "wishlist", operation: "add", data: product });
  };
  const showWishlistHeart = (product: Product) => {
    if (!Object.keys(auth).length) {
      router.push("/login");
      alert("Please login first");
      return;
    }
    isOnWishlist(product.id)
      ? removeFromWishlist(product)
      : addToWishlist(product);
  };

  return {
    isOnWishlist,
    isOnWishlistCSS,
    showWishlistHeart,
  };
};

export default useWishList;

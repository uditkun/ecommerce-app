import { useRouter } from "next/router";
import { useGlobalState } from "../components/Context";
import { Product } from "../utils/types/Product";
import useCustomFireHooks from "./useCustomFireHooks";

const useWishList = () => {
  const {
    auth,
    user: { wishlist: wishlist },
  } = useGlobalState();
  const router = useRouter();
  const { updateUserData } = useCustomFireHooks();

  const isOnWishlist = (id: number): boolean => {
    return Boolean(wishlist?.find((item: Product) => item.id === id));
  };

  const isOnWishlistCSS = (id: number, customCSS?: string): string => {
    return isOnWishlist(id) ? "wishlist wishlist_active" : "wishlist";
  };

  const removeFromWishlist = (product: Product) => {
    updateUserData({ title: "wishlist", operation: "remove", data: product });
  };
  const addToWishlist = (product: Product) => {
    updateUserData({ title: "wishlist", operation: "add", data: product });
  };
  const showWishlistHeart = (product: Product) => {
    if (!Object.keys(auth).length) {
      router.push("/login");
      console.log("Please login first");
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

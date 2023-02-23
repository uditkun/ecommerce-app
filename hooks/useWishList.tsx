import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  ACTIONS,
  useDispatchGlobalState,
  useGlobalState,
} from "../components/Context";
const useWishList = () => {
  const { auth } = useGlobalState();
  const dispatch = useDispatchGlobalState();
  const router = useRouter();

  const [heartWish, setHeartWish] = useState([]);

  useEffect(() => {
    if (auth?.wishlist) {
      setHeartWish(auth.wishlist);
    }
  }, [setHeartWish, auth]);

  const isOnWishlist = (id: number): boolean => {
    return heartWish.map((item: any) => item.id).includes(id);
  };

  const isOnWishlistCSS = (id: number, customCSS?: string): string => {
    return isOnWishlist(id) ? "wishlist wishlist_active" : "wishlist";
  };

  const removeFromWishlist = (id: number) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_WISHLIST, payload: id });
  };
  const addToWishlist = (id: number) => {
    dispatch({ type: ACTIONS.ADD_TO_WISHLIST, payload: id });
  };
  const showWishlistHeart = (id: number) => {
    if (!auth) {
      router.push("/login");
      console.log("Please login first");
      return;
    }
    isOnWishlist(id)
      ? dispatch({ type: ACTIONS.REMOVE_FROM_WISHLIST, payload: id })
      : dispatch({ type: ACTIONS.ADD_TO_WISHLIST, payload: id });
  };

  return {
    isOnWishlist,
    isOnWishlistCSS,
    removeFromWishlist,
    addToWishlist,
    showWishlistHeart,
  };
};

export default useWishList;

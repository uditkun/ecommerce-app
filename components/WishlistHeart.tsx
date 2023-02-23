import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useWishList from "../hooks/useWishList";

type WishlistHeartProps = { id: number; customCSS?: string; size?: SizeProp };

const WishlistHeart = ({ id, customCSS = "", size }: WishlistHeartProps) => {
  // Make sure parent component is relatively positioned
  const { isOnWishlistCSS, showWishlistHeart } = useWishList();
  if (!id) {
    return <></>;
  }
  return (
    <FontAwesomeIcon
      className={isOnWishlistCSS(id, customCSS)}
      onClick={(e) => {
        e.preventDefault();
        showWishlistHeart(id);
      }}
      icon={faHeart}
      size={size}
    ></FontAwesomeIcon>
  );
};

export default WishlistHeart;

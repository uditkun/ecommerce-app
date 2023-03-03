import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product } from "../utils/types/Product";

type WishlistHeartProps = {
  product: Product;
  customCSS?: string;
  size?: SizeProp;
  wishlistHandlers: any;
};

const WishlistHeart = ({
  product,
  customCSS = "",
  size,
  wishlistHandlers,
}: WishlistHeartProps) => {
  // Make sure parent component is relatively positioned
  if (!product) {
    return <></>;
  }
  const { isOnWishlistCSS, isOnWishlist, showWishlistHeart } = wishlistHandlers;

  return (
    <FontAwesomeIcon
      className={isOnWishlistCSS(product.id, customCSS)}
      onClick={(e) => {
        e.preventDefault();
        showWishlistHeart(product, isOnWishlist);
      }}
      icon={faHeart}
      size={size}
    ></FontAwesomeIcon>
  );
};

export default WishlistHeart;

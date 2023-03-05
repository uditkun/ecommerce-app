import Image from "next/image";
import { Product } from "../utils/types/Product";
import WishlistHeart from "./WishlistHeart";

const ProductCard = ({
  details,
  wishlistHandlers,
}: {
  details: Product;
  wishlistHandlers: any;
}) => {
  return (
    <div className="flex flex-col relative">
      <WishlistHeart product={details} wishlistHandlers={wishlistHandlers} />
      <figure>
        <Image
          className="rounded"
          src={details.imgSrc}
          width={300}
          height={300}
          alt="ref image"
        />
      </figure>

      <div className="flex flex-col gap-0 pt-3">
        <span className="text-sm font-semibold leading-[0.75]">
          {details.companyName}
        </span>
        <div className="font-bold flex justify-between">
          <span className="text-lg overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
            {details.name}
          </span>
          <span className="text-lg mr-2">${details.price}</span>
        </div>
      </div>
      <span>
        <span className="font-bold text-green-700">{details.discount}%</span>{" "}
        discount
      </span>
      <span>Free delivery</span>
    </div>
  );
};

export default ProductCard;

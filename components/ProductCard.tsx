import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import WishlistHeart from "./WishlistHeart";

const ProductCard = ({ details }: any) => {
  return (
    <div className="flex flex-col relative">
      <WishlistHeart id={details.id} />
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
          <span className="text-lg mr-2">{details.price}</span>
        </div>
      </div>
      <span>Free delivery</span>
      <span className="leading-[1.2]">
        {details.offers ? (
          <p>
            Offer Available @{" "}
            <strong className="text-green-600">{details.discount}%</strong>
          </p>
        ) : null}
      </span>
    </div>
  );
};

export default ProductCard;

import Image from "next/image";
import Link from "next/link";
import { getHref } from "../utils/helperFunctions";

const Card = ({ item, helperLink = "" }: any) => {
  return (
    <Link
      href={helperLink + "/" + getHref(item.name)}
      className="max-w-[250px] pb-2 bg-slate-600 rounded-t-lg rounded-b-md flex flex-col cursor-pointer"
    >
      <Image
        className="rounded-t-md shadow-md object-contain w-full"
        src={item.imgSrc}
        width={200}
        height={200}
        sizes=" 400px,(max-width: 768px) 320px,(max-width: 1280px) 400px"
        alt="placeholder"
      />
      {/* <img src="#" alt="#" /> */}
      <p className="text-center pt-1 text-white">{item.name}</p>
    </Link>
  );
};

export default Card;

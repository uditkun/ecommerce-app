import {
  faBox,
  faHeart,
  faUser,
  faStar,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useGlobalState } from "../../components/Context";
import usePageAuth from "../../hooks/usePageAuth";

function Dashboard() {
  usePageAuth();
  const menuList = [
    {
      icon: faBox,
      title: "Orders",
      href: "/dashboard/orders",
    },
    {
      icon: faShoppingCart,
      title: "Cart",
      href: "/cart",
    },
    {
      icon: faHeart,
      title: "Wishlist",
      href: "/dashboard/wishlist",
    },
    {
      icon: faUser,
      title: "Profile",
      href: "/dashboard/profile",
    },
  ];

  return (
    <section className="max-w-3xl p-8 mx-auto flex flex-col justify-center items-center">
      <div className="w-[150px] h-[150px] relative">
        <Image
          src="/placeholder.png"
          fill={true}
          className="w-full rounded-[50%] object-cover cursor-pointer"
          alt="profileImg"
        />
      </div>
      <ul className="flex flex-col gap-2 mt-8 w-full items-center">
        {menuList.map((item) => {
          return (
            <Link
              key={item.title}
              href={item.href}
              className="p-2 pl-4 font-semibold cursor-pointer rounded w-full sm:w-3/4 hover:bg-gray-200 md:text-lg"
            >
              <li>
                <FontAwesomeIcon icon={item.icon} className="pr-4" size="lg" />
                {item.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}

export default Dashboard;

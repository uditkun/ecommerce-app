import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faDashboard,
  faHeart,
  faList,
  faRightFromBracket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useMenuToggle from "../hooks/useMenuToggle";
import { useGlobalState } from "./Context";
import useLogOut from "../hooks/useLogOut";
import SearchBar from "./SearchBar";

function Header() {
  const menuIcon = useRef<HTMLLIElement>(null);
  const [trackAuth, setTrackAuth] = useState("");
  const globalContext = useGlobalState();
  const logOut = useLogOut();

  useEffect(() => {
    setTrackAuth(globalContext.auth);
  }, [globalContext.auth]);

  const menuItems = [
    {
      name: "Dashboard",
      icon: faList,
      href: "/dashboard",
    },
    {
      name: "Cart",
      icon: faShoppingCart,
      href: "/cart",
    },
    {
      name: "Wishlist",
      icon: faHeart,
      href: "/dashboard/wishlist",
    },
  ];

  useMenuToggle(menuIcon, "menu");

  return (
    <nav className="sticky top-0 bg-gray-800 z-50">
      <div className="flex flex-col items-center justify-between gap-2 px-8 pt-2 pb-4 mx-auto text-white sm:flex-row sm:pb-2 max-w-7xl relative">
        <Link href="/">
          <span className="cursor-pointer text-lg font-bold">E-shop</span>
        </Link>

        <SearchBar />

        <ul className="flex items-center gap-2">
          {/* <li className="p-2 cursor-pointer">Item 1</li>
          <li className="p-2 cursor-pointer">Item 2</li> */}
          <li className="p-2 cursor-pointer">
            <Link href="/cart">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Link>
          </li>
          {trackAuth ? (
            <li className="p-2 cursor-pointer" ref={menuIcon}>
              <FontAwesomeIcon icon={faCircleUser} size="xl" />
            </li>
          ) : (
            <li className="p-2 cursor-pointer">
              <Link
                href="/login"
                className="px-4 rounded-sm sm:px-7 pb-1 pt-[2px] bg-white text-gray-800"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        <ul
          id="menu"
          className="absolute top-[89px] sm:top-[58px] w-40 right-0 bg-white text-black rounded-sm invisible shadow-lg"
        >
          {menuItems.map((li) => {
            return (
              <li key={li.name}>
                <Link
                  href={li.href}
                  className="py-3 px-6 rounded-sm hover:bg-gray-300 cursor-pointer block"
                >
                  <FontAwesomeIcon icon={li.icon} className="mr-2" /> {li.name}
                </Link>
              </li>
            );
          })}

          {trackAuth ? (
            <li
              onClick={() => logOut()}
              className="py-3 px-6 rounded-sm hover:bg-gray-300 cursor-pointer"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" /> Log
              Out
            </li>
          ) : (
            <li className="py-3 px-6 rounded-sm hover:bg-gray-300 cursor-pointer">
              <Link href="/login">
                <FontAwesomeIcon icon={faDashboard} className="mr-2" /> Log In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;

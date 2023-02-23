import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import {
  useGlobalState,
  useDispatchGlobalState,
  ACTIONS,
} from "../components/Context";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const router = useRouter();
  const { cart, auth } = useGlobalState();
  const dispatch = useDispatchGlobalState();
  useEffect(() => {
    setCartProducts(cart);
  }, [cart]);

  const getCheckoutItems = () => {
    const initialCheckoutItems = [
      ...auth.checkedOutItems,
      ...cartProducts.map((item: any) => {
        item.quantity ||= 1;
        return item;
      }),
    ];
    const uniqueItems = initialCheckoutItems.filter(
      (product: any, index: number, arr: any[]) =>
        arr.findIndex((item: any) => item.id === product.id) === index
    );

    const uniqueList = uniqueItems
      .map((product: any) => {
        return initialCheckoutItems.filter(
          (item: any) => item.id === product.id
        );
      })
      .map((arr: any[]) => {
        return arr.reduce((acc: any, curr: any) => {
          return { ...acc, quantity: curr.quantity + acc.quantity };
        });
      });
    return uniqueList;
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold pb-4 text-center">Cart Items</h2>
      <ul className="flex gap-4 flex-wrap justify-center items-center relative mx-auto max-w-[1200px] px-5">
        {cartProducts.length ? (
          cartProducts?.map((product: any) => {
            return (
              <li
                className="p-2 md:w-3/5 bg-[#f2f2f2] shadow-light-step rounded flex flex-col md:flex-row md:gap-4 md:justify-between"
                key={product.id}
              >
                <Card item={product} helperLink="/products" />
                <div className="max-w-lg w-full flex flex-col md:justify-between">
                  <div className="px-1 flex flex-col">
                    <strong className="text-gray-600 mt-2 block">
                      {product.companyName}
                    </strong>
                    <div className="px-1 flex gap-1 justify-between">
                      <strong className="text-gray-600">
                        <FontAwesomeIcon icon={faStar} className="mr-1" />
                        {product.rating}
                      </strong>
                      <strong>{product.price}</strong>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center mt-2">
                    <button
                      type="button"
                      className="py-2 px-4 bg-red-600 text-white rounded flex-1 text-center max-w-[150px]"
                      onClick={() => {
                        dispatch({
                          type: ACTIONS.REMOVE_FROM_CART,
                          payload: product.id,
                        });
                      }}
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => {
                        if (!auth) {
                          router.push("/login");
                          return;
                        }
                        dispatch({
                          type: ACTIONS.ADD_TO_CHECKOUT,
                          payload: product,
                        });
                        router.push("/checkout");
                      }}
                      className="py-2 px-4 bg-green-500 text-white rounded flex-1 text-center max-w-[150px]"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <div>
            <p>No products in cart</p>
            <Link
              href="/"
              className="py-2 px-4 bg-slate-600 text-white block mt-5 rounded"
            >
              Add Products
            </Link>
          </div>
        )}
      </ul>
      {cartProducts.length ? (
        <button
          className="py-2 px-4 bg-yellow-500 max-w-xs mx-auto w-full text-gray-700 font-semibold block mt-12 rounded"
          onClick={() => {
            if (!auth) {
              router.push("/login");
              return;
            }
            dispatch({
              type: ACTIONS.UPDATE_CHECKOUT,
              payload: getCheckoutItems(),
            });
            router.push("/checkout");
          }}
        >
          Buy All
        </button>
      ) : (
        <></>
      )}
    </section>
  );
}

export default Cart;

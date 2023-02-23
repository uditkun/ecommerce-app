import React, { useEffect, useState } from "react";
import {
  useGlobalState,
  useDispatchGlobalState,
  ACTIONS,
} from "../../components/Context";
import useIsAuthDone from "../../hooks/useIsAuthDone";
import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const Orders = () => {
  const [orderedProducts, setOrderedProducts] = useState<any>([]);
  const router = useRouter();
  const dispatch = useDispatchGlobalState();
  const { auth } = useGlobalState();
  const date = new Date();
  useEffect(() => {
    auth.orders && setOrderedProducts([...auth.orders]);
  }, [auth.orders]);
  useIsAuthDone();

  return (
    <section className="p-4">
      <h3 className="text-2xl font-semibold pb-4 text-center">Orders</h3>
      <ul className="flex gap-4 flex-wrap justify-center items-center relative mx-auto max-w-[1200px] px-5">
        {orderedProducts.length ? (
          orderedProducts.map((product: any) => {
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
                    <div className="flex gap-1 mt-2 justify-between">
                      <strong className="text-gray-600">
                        <FontAwesomeIcon icon={faStar} className="mr-1" />
                        {product.rating}
                      </strong>
                      <strong>{product.price}</strong>
                    </div>
                    <p className="flex w-full justify-between mt-2">
                      <span>Quantity</span>
                      <span className="font-semibold">{product.quantity}</span>
                    </p>
                    <p className="flex w-full justify-between mt-2">
                      <span>Delivered On</span>
                      <span className="font-semibold">{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</span>
                    </p>
                    <button
                      type="button"
                      className="py-1 px-4 w-4/5 self-center mt-2 md:mt-4 bg-gray-600 text-white rounded flex-1 text-center max-w-[150px]"
                      onClick={() => {
                        dispatch({
                          type: ACTIONS.ADD_TO_CHECKOUT,
                          payload: { ...product, quantity: 1 },
                        });
                        router.push("/checkout");
                      }}
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <p>Let&apos;s order some items</p>
        )}
      </ul>
    </section>
  );
};

export default Orders;

import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../components/Context";
import usePageAuth from "../../hooks/usePageAuth";
import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useLatestFireUpdate from "../../hooks/useLatestFireUpdate";
import { useRouter } from "next/router";
import { redirectForPayment } from "../../utils/stripe-helpers";
import Link from "next/link";

const Orders = () => {
  usePageAuth();
  const {
    auth,
    user: { purchasedItems },
  } = useGlobalState();
  const router = useRouter();
  useLatestFireUpdate();
  const [orderedProducts, setOrderedProducts] = useState<any[]>([]);

  useEffect(() => {
    const getProducts: any[] = Object.values(
      purchasedItems.map((item: any) => Object.values(item)).flat()
    );
    if (getProducts.length) {
      setOrderedProducts(getProducts);
    }
  }, [purchasedItems]);

  return (
    <section className="p-4">
      <h3 className="text-2xl font-semibold pb-4 text-center">Orders</h3>
      <ul className="flex gap-4 flex-wrap justify-center items-center relative mx-auto max-w-[1200px] px-5">
        {orderedProducts.length ? (
          orderedProducts?.map((product: any) => {
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
                      <strong>${product.price}</strong>
                    </div>
                    <p className="flex w-full justify-between mt-2">
                      <span>Quantity</span>
                      <span className="font-semibold">{product.quantity}</span>
                    </p>
                    <p className="flex flex-col w-full mt-2">
                      <span>Ordered On</span>
                      <span className="font-semibold">{`${new Date(
                        product.created * 1000
                      ).toDateString()}`}</span>
                    </p>
                    <p className="flex justify-between w-full mt-2">
                      <span>Total</span>
                      <strong>${product.price * product.quantity}</strong>
                    </p>
                    <button
                      type="button"
                      className="py-1 px-4 w-4/5 self-center mt-4 md:mt-6 bg-gray-600 text-white rounded flex-1 text-center max-w-[150px]"
                      onClick={() => {
                        if (!auth.uid) {
                          router.push("/");
                          return;
                        }
                        redirectForPayment(
                          [{ orderId: product.orderId }],
                          auth.email
                        );
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
          <div>
            <p>Let&apos;s order some items</p>
            <Link
              href="/"
              className="py-2 px-4 bg-slate-600 text-white mt-5 block max-w-fit rounded mx-auto"
            >
              Go to shop
            </Link>
          </div>
        )}
      </ul>
    </section>
  );
};

export default Orders;

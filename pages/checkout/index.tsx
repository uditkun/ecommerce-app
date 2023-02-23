import { faMinus, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import {
  ACTIONS,
  useDispatchGlobalState,
  useGlobalState,
} from "../../components/Context";
import useIsAuthDone from "../../hooks/useIsAuthDone";

function Checkout() {
  useIsAuthDone();
  const { auth } = useGlobalState();
  const dispatch = useDispatchGlobalState();
  const [checkedOutItems, setCheckedOutItems] = useState<any>([]);
  const date = new Date();
  useEffect(() => {
    setCheckedOutItems(
      auth?.checkedOutItems?.sort(
        (a: any, b: any) =>
          Number(a.price?.slice(1)) - Number(b.price?.slice(1))
      )
    );
  }, [auth]);

  const updateCheckedOutItems = (product: any, num: number) => {
    const newProduct = checkedOutItems.find(
      (item: any) => item.id === product.id
    );
    const newCheckoutItems = checkedOutItems.filter(
      (item: any) => product.id !== item.id
    );
    // console.log(newCheckoutItems);
    if (product.quantity + num <= 0) {
      setCheckedOutItems(newCheckoutItems);
      dispatch({ type: ACTIONS.UPDATE_CHECKOUT, payload: newCheckoutItems });
      return;
    }
    const updatedNewCheckout = [
      ...newCheckoutItems,
      { ...newProduct, quantity: newProduct.quantity + num },
    ].sort(
      (a: any, b: any) => Number(a.price.slice(1)) - Number(b.price.slice(1))
    );
    setCheckedOutItems(updatedNewCheckout);
    dispatch({ type: ACTIONS.UPDATE_CHECKOUT, payload: updatedNewCheckout });
  };

  const getTotal = (checkoutArray: any) => {
    return checkedOutItems?.reduce(
      (total: any, next: any) =>
        (
          parseFloat(total) +
          parseFloat(
            String(
              Number(next?.price?.slice(1)) *
                next?.quantity *
                (1 - next?.discount / 100)
            )
          )
        ).toFixed(2),
      0
    );
  };

  return (
    <section>
      <h3 className="text-2xl font-semibold pb-4 text-center">Checkout</h3>
      <ul className="flex mb-4 gap-4 flex-wrap justify-center items-center relative mx-auto max-w-[1200px] px-5">
        {checkedOutItems?.length ? (
          checkedOutItems.map((product: any) => {
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
                      <span className="flex items-center">
                        <FontAwesomeIcon
                          icon={faPlus}
                          size="sm"
                          className="mr-2 rounded bg-slate-200 p-1 cursor-pointer"
                          onClick={() => updateCheckedOutItems(product, 1)}
                        />
                        <span className="font-bold text-lg">
                          {product.quantity}
                        </span>
                        <FontAwesomeIcon
                          icon={faMinus}
                          size="sm"
                          className="ml-2 rounded bg-slate-200 p-1 cursor-pointer"
                          onClick={() => updateCheckedOutItems(product, -1)}
                        />
                      </span>
                    </p>
                    <p className="flex w-full justify-between mt-2">
                      <span>Delivery by</span>
                      <span className="font-semibold">{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</span>
                    </p>
                    <p className="flex w-full justify-between mt-2">
                      <span>Discount</span>
                      <span className="font-semibold">{product.discount}%</span>
                    </p>
                    <p className="flex w-full justify-between mt-2">
                      <span>Total</span>
                      <span className="font-semibold">
                        {(
                          (1 - product?.discount / 100) *
                          product?.quantity *
                          Number(product?.price?.slice(1))
                        ).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <div className="flex flex-col gap-2 justify-center mt-5">
            <p>Buy your favorite products</p>
            <Link
              href="/"
              className="bg-slate-600 rounded px-4 py-2 text-white block text-center"
            >
              Go to shop
            </Link>
          </div>
        )}
      </ul>
      {checkedOutItems?.length ? (
        <>
          <hr />
          <div className="flex gap-4 justify-around md:w-3/5 items-center mx-auto font-bold text-xl">
            <span>Net Total</span>
            <span className="mt-2">
              {checkedOutItems?.length && "$" + getTotal(checkedOutItems)}
            </span>
          </div>
          <Link
            href="/checkout/payment"
            className="block text-center my-6 rounded-sm bg-slate-600 py-2 px-4 text-white md:w-3/5 max-w-[300px] mx-auto"
          >
            Confirm order
          </Link>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}

export default Checkout;

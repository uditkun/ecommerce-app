import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useGlobalState } from "../../components/Context";
import useCustomFireHooks from "../../hooks/useCustomFireHooks";
import usePageAuth from "../../hooks/usePageAuth";

function Success() {
  usePageAuth();
  const {
    query: { session_id },
  } = useRouter();
  const { auth } = useGlobalState();
  const { updateUserArrayData } = useCustomFireHooks();

  const { data, isError, isLoading, isFetched } = useQuery(
    ["success_checkout", session_id?.slice(8, 16)],
    async () => {
      const data = await fetch(`${location.origin}/api/checkout/${session_id}`);
      const res = await data.json();
      return res;
    },
    { staleTime: 10 * 60000 }
  );

  const { data: products } = useQuery("products", async () => {
    const rawData = await fetch(`${location.origin}/api/products`).then((res) =>
      res.json()
    );
    return rawData;
  });

  if (
    data?.retrieve?.customer_email === auth.email ||
    data?.retrieve?.customer_email === "anyonmous@anyonmous.com"
  ) {
    const purchasedItems = data?.lineItems?.data
      ?.map((item: any) => {
        return {
          orderId: item?.price?.id,
          created: item?.price?.created,
          product: item?.price?.product,
          unit_amount: item?.price?.unit_amount / 100,
          quantity: item?.quantity,
        };
      })
      .map((orderedProduct: any) => {
        const product = products.find(
          (i: any) => i.orderId === orderedProduct.orderId
        );
        return { ...product, ...orderedProduct };
      });
    console.log(purchasedItems);
    if (purchasedItems?.every((item: any) => item.id)) {
      updateUserArrayData({
        title: "purchasedItems",
        operation: "add",
        data: { ...purchasedItems },
      });
    }
  }

  if (isError) {
    return <p>Some error occured</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isFetched && (
        <div>
          <p>Yay! Your order is on its way!</p>
          <p>Thank you for the purchase.</p>
        </div>
      )}
    </>
  );
}

export default Success;

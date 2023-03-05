import getStripe from "./getStripe";
import { CartProduct } from "./types/Product";

type LineItem = {
  orderId: string;
};

export const redirectForPayment = async (
  itemsArr: LineItem[],
  email: string
) => {
  //stripe checkout
  const { id } = await fetch(`${location.origin}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: itemsArr,
      email,
    }),
  }).then((res) => res.json());
  // console.log(data);
  //redirect to checkout
  const stripe = await getStripe();
  stripe?.redirectToCheckout({ sessionId: id });
};

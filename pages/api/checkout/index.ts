import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
import { CartProduct } from "../../../utils/types/Product";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        req?.body?.items.map((item: CartProduct) => {
          return {
            price: item.orderId,
            quantity: 1,
            adjustable_quantity: { enabled: true, maximum: 10 },
          };
        });

      const params: Stripe.Checkout.SessionCreateParams = {
        mode: "payment",
        payment_method_types: ["card"],
        line_items: lineItems ?? [],
        customer_email: req?.body?.email ?? "anyonmous@anyonmous.com",
        success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
        currency: "usd",
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

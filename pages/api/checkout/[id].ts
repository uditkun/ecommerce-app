import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = String(req.query.id);

  try {
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect checkout session id");
    }
    const checkoutSessionRetrieve = await stripe.checkout.sessions.retrieve(id);
    const checkoutSessionListItems =
      await stripe.checkout.sessions.listLineItems(id);
    res.status(200).json({
      retrieve: checkoutSessionRetrieve,
      lineItems: checkoutSessionListItems,
    });
  } catch (error: any) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}

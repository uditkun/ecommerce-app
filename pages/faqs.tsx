import React from "react";

const faqs = () => {
  return (
    <>
      <h2>FAQs</h2>
      <ul>
        <li>
          <h4>What is this app about?</h4>
          <p>
            It is a demo ecommerce app with features like authentication, cart,
            wishlist, checkout, etc built using React(Next.js), Typescript,
            React Query, Firebase and Stripe, currently contains demo shoe
            products.
          </p>
        </li>
        <li>
          <h4>Is this copy paste from youtube?</h4>
          <p>
            Nope. Fully customized hand typed (with some snippets from
            stackoverflow and github xD)
          </p>
        </li>
        <li>
          <h4>Why have you included features like rating?</h4>
          <p>I just felt I should add it.😅</p>
        </li>
        <li>
          <h4>How to checkout for testing purpose?</h4>
          <span>Use card details:-</span>
          <div className="flex flex-col gap-1">
            <span>Card No:- 4242424242424242</span>
            <span>MM/YY:- 04/24</span>
            <span>CVC/CVV:- 424</span>
          </div>
        </li>
      </ul>
    </>
  );
};

export default faqs;

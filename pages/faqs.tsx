import Link from "next/link";
import React from "react";

const faqs = () => {
  return (
    <div className="pl-4">
      <h2 className="text-2xl font-bold text-center">FAQs</h2>
      <ul className="flex flex-col gap-6">
        <li>
          <h3 className="text-lg font-medium">What is this app about?</h3>
          <p>
            It is a demo ecommerce app with features like authentication, cart,
            wishlist, checkout, etc built using React(Next.js), Typescript,
            React Query, Firebase and Stripe, currently contains demo shoe
            products.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-medium">
            Is this copy paste from youtube?
          </h3>
          <p>
            Nope. Fully customized hand typed (with some snippets from
            stackoverflow and github xD)
          </p>
        </li>
        <li>
          <h3 className="text-lg font-medium">
            How to use checkout for testing purpose?
          </h3>
          <span>Use card details:-</span>
          <div className="flex flex-col gap-1">
            <span>Card No:- 4242424242424242</span>
            <span>MM/YY, CVV :- any valid numbers</span>
            <span>Country: USA, 43001, Ohio</span>
          </div>
        </li>
        <li>
          <h3 className="text-lg font-medium">
            What about feature &apos;X&apos;?
          </h3>
          <p>
            Feel free to reach out on my email for a conversation:-{" "}
            <Link
              className="text-blue-500"
              href="mailto:contactuditdev@gmail.com"
            >
              contactuditdev@gmail.com
            </Link>
          </p>
        </li>
        {/* <li>
          <h4>How about work?</h4>
          <p>I was a freelance for 1 year, now looking for full time positions for React developer role.</p>
        </li> */}
      </ul>
      <h3 className="text-lg font-bold mt-4">Have work for me👀?</h3>
      <div className="flex gap-2 mt-2">
        <Link href="https://github.com/uditkun" target="_blank">
          <button className="px-4 py-2 rounded border-2 border-blue-700">
            Learn more
          </button>
        </Link>
        <Link href="mailto:contactuditdev@gmail.com">
          <button className="px-4 py-2 rounded bg-blue-700 text-white w-[116px]">
            Yes!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default faqs;

import React from "react";
import usePageAuth from "../../hooks/usePageAuth";

function Payment() {
  usePageAuth();
  return <div>Payment</div>;
}

export default Payment;

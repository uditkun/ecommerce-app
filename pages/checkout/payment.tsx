import React from "react";
import useIsAuthDone from "../../hooks/useIsAuthDone";

function Payment() {
  useIsAuthDone();
  return <div>Payment</div>;
}

export default Payment;

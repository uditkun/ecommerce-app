import React from "react";
import useIsAuthDone from "../../hooks/useIsAuthDone";

function Success() {
  useIsAuthDone();
  return <div>Yay! Your order is on its way!</div>;
}

export default Success;

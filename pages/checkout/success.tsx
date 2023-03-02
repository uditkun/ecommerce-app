import React from "react";
import usePageAuth from "../../hooks/usePageAuth";

function Success() {
  usePageAuth();
  return <div>Yay! Your order is on its way!</div>;
}

export default Success;

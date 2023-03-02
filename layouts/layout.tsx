import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { ACTIONS, useDispatchGlobalState } from "../components/Context";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { auth } from "../utils/firebase";

function Layout({ children }: { children: React.ReactNode }) {
  // const dispatch = useDispatchGlobalState();
  // const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //   console.log("onAuthStateChanged run");
  //   if (user) {
  //     dispatch({ type: ACTIONS.AUTH, payload: user });
  //   }
  // });
  // unsubscribe();
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header />
      <main className="main relative">
        <Loader />
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

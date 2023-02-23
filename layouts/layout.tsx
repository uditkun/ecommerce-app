import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";

function Layout({ children }: { children: React.ReactNode }) {
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

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SideCart from "@/components/sideCart";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { useRouter } from "next/router";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [openSideCart, setSideCartOpen] = useState(false);
  return (
    <>
      <ToastContainer />
      {router.pathname == "/login" || router.pathname == "/register" ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SideCart openSideCart={openSideCart} setSideCartOpen={setSideCartOpen} />
          <Navbar setSideCartOpen={setSideCartOpen} />
          <Component {...pageProps} />
          <Footer />
        </>
      )}
    </>
  );
}

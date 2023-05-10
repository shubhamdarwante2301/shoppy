import React, { useEffect, useState } from "react";
import Image from "next/image";
import product from "@/assets/product/product-01.jpg.webp";
import { useRouter } from "next/router";

const SideCart = ({ openSideCart, setSideCartOpen }) => {
  const router = useRouter();
  return (
    <div
      className={`${
        openSideCart ? "fixed" : "hidden"
      } top-0 right-0 w-full h-[100vh] bg-black/60 z-50 `}
    >
      <div
        className={`translate-x-0 transition duration-500 ease-in-out fixed top-0 right-0 w-1/4 min-w-[300px] h-full bg-white p-8`}
      >
        <div className="">
          <div className="flex justify-between mb-8">
            <p className="text-lg font-semibold">Your Cart</p>
            <span
              className="cursor-pointer"
              onClick={() => setSideCartOpen(!openSideCart)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </span>
          </div>
          {/* cart item */}
          <div>
            <div className="flex max-w-full my-4">
              <div className="mr-4 relative">
                <div className="absolute top-0 w-full h-full hover:bg-black/50 transform transition duration-500 flex justify-center items-center group">
                  <span className="hidden group-hover:block transform transition duration-500 text-white cursor-pointer">
                    X
                  </span>
                </div>
                <Image
                  src={product}
                  alt="product"
                  className="w-20 hover:scale-90 z-40"
                />
              </div>
              <div>
                <p>White Shirt Pleat</p>
                <p className="text-gray-400">1 x $19.00</p>
              </div>
            </div>
            <div className="flex max-w-full my-4">
              <div className="mr-4 relative">
                <div className="absolute top-0 w-full h-full hover:bg-black/50 transform transition duration-500 flex justify-center items-center group">
                  <span className="hidden group-hover:block transform transition duration-500 text-white cursor-pointer">
                    X
                  </span>
                </div>
                <Image
                  src={product}
                  alt="product"
                  className="w-20 hover:scale-90 z-40"
                />
              </div>
              <div>
                <p>White Shirt Pleat</p>
                <p className="text-gray-400">1 x $19.00</p>
              </div>
            </div>
            <div className="flex max-w-full my-4">
              <div className="mr-4 relative">
                <div className="absolute top-0 w-full h-full hover:bg-black/50 transform transition duration-500 flex justify-center items-center group">
                  <span className="hidden group-hover:block transform transition duration-500 text-white cursor-pointer">
                    X
                  </span>
                </div>
                <Image
                  src={product}
                  alt="product"
                  className="w-20 hover:scale-90 z-40"
                />
              </div>
              <div>
                <p>White Shirt Pleat</p>
                <p className="text-gray-400">1 x $19.00</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-xl font-semibold">Total: $75.00</p>
            <div className="flex flex-col sm:flex-row">
              <button
                className="bg-black text-white hover:bg-[#007BFF]/80 duration-500 min-w-min px-10 py-2 rounded-full mt-4 font-bold mr-2"
                onClick={() => {
                  router.push("/cart");
                  setSideCartOpen(!openSideCart);
                }}
              >
                VIEWCART
              </button>
              <button className="bg-black text-white hover:bg-[#007BFF]/80 duration-500 min-w-min px-10 py-2 rounded-full mt-4 font-bold">
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCart;

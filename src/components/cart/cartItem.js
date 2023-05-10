import React, { useEffect, useState } from "react";
import Image from "next/image";
import product from "@/assets/product/product-01.jpg.webp";

const CartItem = () => {
  const [numberOfPices, setNumberOfPices] = useState(1);
  const [price, setPrice] = useState(36);
  const [totalPrice, setTotalPrice] = useState();
  useEffect(() => {
    setTotalPrice(price * numberOfPices);
  }, [numberOfPices, price]);
  return (
    <div className="grid grid-cols-4 p-4 border">
      <div className="flex mr-5">
        <div className="mr-4 relative bg-green-500">
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
        <p>Fresh Strawberries</p>
      </div>
      <div>
        <p> $ {price}</p>
      </div>
      <div>
        <div className="flex">
          <div
            className="px-4 py-2 border text-xl cursor-pointer"
            onClick={() => {
              if (numberOfPices > 1) {
                setNumberOfPices(numberOfPices - 1);
              }
            }}
          >
            -
          </div>

          <div className="px-4 py-2 border bg-gray-200">{numberOfPices}</div>
          <div
            className="px-4 py-2 border text-xl cursor-pointer"
            onClick={() => {
              setNumberOfPices(numberOfPices + 1);
            }}
          >
            +
          </div>
        </div>
      </div>
      <div>
        <p>$ {totalPrice}</p>
      </div>
    </div>
  );
};

export default CartItem;

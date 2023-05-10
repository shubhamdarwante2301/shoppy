import Image from "next/image";
import React, { useState } from "react";
import product from "@/assets/product/product-01.jpg.webp";
import product1 from "@/assets/product-details/product-detail-01.jpg.webp";
import product2 from "@/assets/product-details/product-detail-02.jpg.webp";
import product3 from "@/assets/product-details/product-detail-03.jpg.webp";

const ProductCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [productImage, setProductImage] = useState([
    product1,
    product2,
    product3,
  ]);
  const [showImage, setShowImage] = useState(0);
  const [numberOfPices, setNumberOfPices] = useState(1);
  return (
    <>
      {openModal && (
        <div className="z-50 fixed top-0 left-0 bg-black/50 h-full overflow-y-auto flex justify-center items-center">
          <div className="w-full h-[80%] mb-8">
            <div className="relative w-[90%] mx-auto bg-white p-4 md:flex">
              <span
                className="absolute top-0 right-0 w-4 md:w-6 -mt-6 md:-mt-8 cursor-pointer"
                onClick={() => setOpenModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current text-white"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>

              <div className="md:w-2/4 h-full flex">
                <div className="w-1/4 max-h-full">
                  {productImage.map((item, index) => {
                    return (
                      <Image
                        key={index}
                        src={item}
                        alt="product image"
                        className="max-h-[33%] pb-4 pr-4"
                        onClick={() => setShowImage(index)}
                      />
                    );
                  })}
                </div>
                <div className="relative w-3/4 max-h-full">
                  <div className="absolute w-full h-full flex items-center justify-between p-2">
                    <span
                      className="w-4 md:w-6"
                      onClick={() => {
                        if (showImage == 0) {
                          setShowImage(productImage.length - 1);
                        } else {
                          setShowImage(showImage - 1);
                        }
                      }}
                    >
                      <svg
                        className="fill-current text-gray-500 hover:text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
                      </svg>
                    </span>
                    <span
                      className="w-4 md:w-6"
                      onClick={() => {
                        if (productImage.length - 1 == showImage) {
                          setShowImage(0);
                        } else {
                          setShowImage(showImage + 1);
                        }
                      }}
                    >
                      <svg
                        className="fill-current text-gray-500 hover:text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
                      </svg>
                    </span>
                  </div>
                  <Image
                    src={productImage[showImage]}
                    alt="productImage"
                    className="w-full max-h-full"
                  />
                </div>
              </div>

              <div className="mt-8 md:mt-0 md:px-8">
                <h3 className="text-2xl font-semibold mb-4">
                  Lightweight Jacket
                </h3>
                <h3 className="text-xl font-semibold text-black mb-4">
                  $45.44
                </h3>
                <p className="mb-4">
                  Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus
                  ligula. Mauris consequat ornare feugiat.
                </p>
                <div>
                  <div>
                    <span className="mr-6">Size</span>
                    <select className="border">
                      <option>Choose an option</option>
                      <option>Size S</option>
                      <option>Size M</option>
                      <option>Size L</option>
                      <option>Size XL</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <span className="mr-4">Color</span>
                    <select className="border">
                      <option>Choose an option</option>
                      <option>Red</option>
                      <option>Blue</option>
                      <option>Green</option>
                      <option>Black</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <div className="flex">
                    <div
                      className="px-4 py-2 border text-xl"
                      onClick={() => {
                        if (numberOfPices > 1) {
                          setNumberOfPices(numberOfPices - 1);
                        }
                      }}
                    >
                      -
                    </div>

                    <div className="px-4 py-2 border bg-gray-200">
                      {numberOfPices}
                    </div>
                    <div
                      className="px-4 py-2 border text-xl"
                      onClick={() => {
                        setNumberOfPices(numberOfPices + 1);
                      }}
                    >
                      +
                    </div>
                  </div>
                  <div className="flex item-center">
                    <button className="bg-[#007BFF]/80 hover:bg-[#007BFF]/60 duration-300 text-white px-8 py-2 ml-4 rounded-full font-bold">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* card */}
      <div className="flex flex-col z-0 my-8 md:my-4">
        <div className="relative max-w-full overflow-hidden bg-cover bg-no-repeat">
          <Image
            src={product}
            alt="product image"
            className="max-w-full transition duration-500 ease-in-out hover:scale-110"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p
            className="text-slate-600 cursor-pointer hover:text-blue-600"
            onClick={() => setOpenModal(true)}
          >
            Formal Shirt
          </p>
          <span className="ml-4 cursor-pointer">
            <svg
              className="fill-current hover:text-[#F98B1D]"
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              viewBox="0 0 512 512"
              fill="none"
            >
              <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
            </svg>
          </span>
        </div>
        <p>$50.00</p>
      </div>
    </>
  );
};

export default ProductCard;

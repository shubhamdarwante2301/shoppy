import React, { useState } from "react";
import Image from "next/image";
import product from "@/assets/product/product-01.jpg.webp";
import CartItem from "@/components/cart/cartItem";

const Cart = () => {
  const [address, setAddress] = useState({
    country: "",
    state: "",
    local: "",
    pinCode: ""
  });

  const onCountryChange = (e) => {
    const text = /^[A-Za-z]+$/
    if (e.target.value === "" || text.test(e.target.value)) {
      setAddress({...address, country: e.target.value});
    }
  }
  const onStateChange = (e) => {
    const text = /^[A-Za-z]+$/
    if (e.target.value === "" || text.test(e.target.value)) {
      setAddress({...address, state: e.target.value});
    }
  }
  const onLocalChange = (e) => {
    setAddress({...address, local: e.target.value});
  }
  const onPinCodeChange = (e) => {
    const text = /^[0-9]+$/
    if (e.target.value === "" || text.test(e.target.value)) {
      setAddress({...address, pinCode: e.target.value});
    }
  }

  return (
    <div className="px-4 sm:px-8 my-12 sm:flex flex-col sm:flex-row">
      <div>
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-4 border p-4 font-bold">
              <p>PRODUCT</p>
              <p>PRICE</p>
              <p>QUANTITY</p>
              <p>TOTAL</p>
            </div>
            {Array(4)
              .fill(0)
              .map((item, index) => {
                return <CartItem key={index} />;
              })}
          </div>
        </div>
        <div className="p-4 border sm:flex">
          <div className="border px-4 py-2 rounded-full sm:mr-4">
            <input placeholder="Enter Coupon Code" />
          </div>
          <button className="hover:bg-black bg-gray-200 hover:text-white text-black duration-500 min-w-full sm:min-w-min px-8 py-2 mt-4 sm:mt-0 rounded-full">
            APPLY COUPON
          </button>
        </div>
      </div>
      <div className="sm:w-1/4 p-4 sm:ml-12 my-8 sm:mt-0 border h-min">
        <p className="font-bold">CART TOTALS</p>
        <hr className="my-4" />
        <div className="flex justify-between font-semibold">
          <p>SubTotals</p>
          <span>$79.65</span>
        </div>
        <div className="flex justify-between font-semibold mt-4">
          <p>Discount</p>
          <span>$0.00</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-semibold mt-4">
          <p>Total</p>
          <span>$79.65</span>
        </div>
        <hr className="my-4" />

        <div className="flex justify-between font-semibold mt-4">
          <div className="">
            <p>Address*</p>
          </div>
          <div className="flex flex-col font-normal">
            <input placeholder="Country" className="border px-2 py-1" value={address.country} onChange={onCountryChange} />
            <input placeholder="State" className="border px-2 py-1 my-2" value={address.state} onChange={onStateChange} />
            <input placeholder="Local" className="border px-2 py-1 my-2" value={address.local} onChange={onLocalChange} />
            <input placeholder="Pin Code" className="border px-2 py-1 my-2" value={address.pinCode} onChange={onPinCodeChange} />
          </div>
        </div>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
        <label for="vehicle1" className="ml-2">
          Use my address
        </label>
        <hr className="my-4" />
        <button className="bg-black hover:bg-[#007BFF]/80 text-white font-bold duration-500 min-w-min px-8 py-2 rounded-full">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;

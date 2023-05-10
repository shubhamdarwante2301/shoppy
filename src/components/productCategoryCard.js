import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const ProductCategoryCard = ({ data }) => {
  const { type, img } = data;
  const router = useRouter();
  return (
    <div className="border relative my-4 sm:m-6 cursor-pointer">
      <div className="absolute w-full h-full group hover:bg-[#007BFF]/50 hover:text-white transform transition duration-500">
        <p className="absolute top-4 left-4 text-3xl font-bold">{type}</p>
        <p
          className="absolute bottom-4 left-4 font-bold opacity-0 group-hover:opacity-100 text-white duration-1000 flex flex-col after:bg-white after:h-[2px]"
          onClick={() => router.push("/shop")}
        >
          SHOP NOW
        </p>
      </div>
      <Image src={img} alt="Product Category Image" />
    </div>
  );
};

export default ProductCategoryCard;

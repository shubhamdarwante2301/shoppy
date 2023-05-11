import React, { useState } from "react";
import ProductCard from "./productCard";

const filterCategories = [
  {
    id: 1,
    type: "All Products",
    isActive: true,
  },
  {
    id: 2,
    type: "Women",
    isActive: false,
  },
  {
    id: 3,
    type: "Men",
    isActive: false,
  },
  {
    id: 4,
    type: "Bag",
    isActive: false,
  },
  {
    id: 5,
    type: "Shoes",
    isActive: false,
  },
  {
    id: 6,
    type: "Watches",
    isActive: false,
  },
];

const AllProducts = () => {
  const [activeFilter, setActiveFilter] = useState(filterCategories);
  const handleActiveFilter = (id) => {
    const newArray = activeFilter.map((menu) => {
      if (menu.id == id) {
        menu.isActive = true;
      } else {
        menu.isActive = false;
      }
      return menu;
    });
    setActiveFilter(newArray);
  };

  return (
    <div className="my-8 mx-8">
      <div className="text-gray-600 mt-4 flex flex-wrap">
        {activeFilter.map((item) => {
          return (
            <span
              key={item.id}
              className={`hover:underline hover:text-black cursor-pointer mr-4 md:mr-8 ${
                item.isActive && "underline text-black"
              }`}
              onClick={() => {
                handleActiveFilter(item.id);
              }}
            >
              {item.type}
            </span>
          );
        })}
      </div>
      {/* products */}
      <div className="mt-6 md:grid grid-cols-4 gap-8">
        {Array(10)
          .fill(0)
          .map((item, index) => {
            return <ProductCard key={index} />;
          })}
      </div>
    </div>
  );
};

export default AllProducts;

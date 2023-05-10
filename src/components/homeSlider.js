import React, { useState } from "react";
import slide1 from "@/assets/slider/slide-01.jpg.webp";
import slide2 from "@/assets/slider/slide-02.jpg.webp";
import slide3 from "@/assets/slider/slide-03.jpg.webp";
import Image from "next/image";

const HomeSlider = () => {
  const [sliderImage, setSliderImage] = useState(0);
  const [imgages, setImages] = useState([slide1, slide2, slide3]);
  return (
    <div className="relative">
      <div className="absolute w-full h-full flex items-center justify-between">
        <span
          className="w-4 md:w-8 ml-4 md:ml-8 cursor-pointer"
          onClick={() => {
            if (sliderImage <= 0) {
              setSliderImage(2);
            } else {
              setSliderImage(sliderImage - 1);
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
          className="w-4 md:w-8 mr-4 md:mr-8 cursor-pointer"
          onClick={() => {
            if (sliderImage >= 2) {
              setSliderImage(0);
            } else {
              setSliderImage(sliderImage + 1);
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
      <Image src={imgages[sliderImage]} alt="slider image" />
    </div>
  );
};

export default HomeSlider;

import React from "react";
import Image from "next/image";

const SignInSignOutLayout = ({ img, form }) => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="md:grid grid-cols-2 items-center md:p-8 w-full md:w-4/5">
        <div className="hidden md:block">
          <Image src={img} alt="side image" />
        </div>
        <div className="p-4 md:p-16">
          <div>{form}</div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignOutLayout;

import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase-config";
// import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import avtarImg from "@/assets/avtarImg.png";
import Image from "next/image";

const Navbar = ({ setSideCartOpen }) => {
  const router = useRouter();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser",currentUser);
      setUser(currentUser);
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText("#20OFF");
  };

  return (
    <>
      {/* Search Modal */}
      {searchModalOpen && (
        <div className="w-full h-full absolute bg-black/50 flex justify-center items-center z-50">
          <div className="w-full m-4 p-4">
            <div
              className="flex justify-end mb-4"
              onClick={() => setSearchModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
            <div className="flex items-center bg-white p-4 w-full">
              <input
                type="text"
                placeholder="Search Products"
                className="border border-white focus:border-white flex-grow"
              />
              <span className="cursor-pointer ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-sm py-2 bg-[#B2B2B2]">
        20% off on Electronic devices! use code{" "}
        <span className="underline font-bold" onClick={handleCopyClick}>
          #20OFF
        </span>
      </div>
      <div className="px-4 sm:px-8 my-4 flex justify-between">
        <div className="flex items-center flex-grow">
          <div
            className="text-xl mr-4 cursor-default"
            onClick={() => router.push("/")}
          >
            <span className="font-semibold">Sho</span>ppy
          </div>
          <div className="flex flex-grow items-center justify-start md:justify-center">
            <div className="hidden border p-2 sm:flex items-center min-w-min sm:w-2/4">
              <input
                type="text"
                placeholder="Search Products"
                className="border border-white focus:border-white flex-grow"
              />
              <span className="cursor-pointer ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="sm:hidden" onClick={() => setSearchModalOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </span>
          {/* cart icon */}
          <span className="ml-4" onClick={() => setSideCartOpen(true)}>
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              viewBox="0 0 576 512"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
          </span>
          {/* heart icon */}
          <span className="ml-4">
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              viewBox="0 0 512 512"
            >
              <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
            </svg>
          </span>
          {user ? (
            <>
              <div className="ml-4 flex items-center relative group dropdown">
                <Image
                  // src={avtarImg}
                  src={user.photoURL || avtarImg}
                  alt="Profile Photo"
                  width={40}
                  height={50}
                  className="rounded-full"
                />
                <p className="ml-1">
                  {user.displayName ||
                    user.email.slice(0, user.email.indexOf("@"))}
                </p>
                <div className="hidden absolute top-0 left-0 mt-10 group-hover:block bg-white p-2 z-50 border-2 w-28">
                  <p
                    className="px-2 bg-slate-200 hover:bg-slate-300 mb-2 cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </p>
                  <p
                    className="px-2 bg-slate-200 hover:bg-slate-300 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </>
          ) : (
            <button
              className="ml-4 bg-black text-white font-semibold px-6 py-1"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

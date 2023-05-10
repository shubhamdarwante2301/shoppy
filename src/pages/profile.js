import React, { useState } from "react";
import { auth } from "@/firebase-config";
import { signOut } from "firebase/auth";
import ProfileInformation from "@/components/profile/profileInformation";
import ManageAddress from "@/components/profile/manageAddress";
import MyWishlist from "@/components/profile/myWishlist";

// const profileMenu = [
//     {
//         id: 1,
//         label: "Profile Information",
//         isSelected: true,
//         handelclick: ""
//     },
//     {
//         id: 1,
//         label: "Manage Address",
//         isSelected: false,
//         handelclick: ""
//     },
//     {
//         id: 1,
//         label: "My wishlist",
//         isSelected: false,
//         handelclick: ""
//     },
//     {
//         id: 1,
//         label: "Profile Information",
//         isSelected: false,
//         handelclick: ""
//     },
// ]

const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState("Profile Information");
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex w-screen min-h-screen max-h-min p-8">
      <div className=" w-1/4 flex justify-end mr-4">
        <div className="border">
          <p
            className={`${
              selectedMenu == "Profile Information"
                ? "text-blue-600"
                : "text-black"
            } cursor-pointer my-4 hover:bg-blue-100 hover:text-blue-600 py-1 px-8 text-lg`}
            onClick={() => setSelectedMenu("Profile Information")}
          >
            Profile Information
          </p>
          <p
            className={`${
              selectedMenu == "Manage Address" ? "text-blue-600" : "text-black"
            } cursor-pointer mb-4 hover:bg-blue-200 hover:text-blue-600 py-1 px-8 text-lg`}
            onClick={() => setSelectedMenu("Manage Address")}
          >
            Manage Address
          </p>
          <p
            className={`${
              selectedMenu == "My wishlist" ? "text-blue-600" : "text-black"
            } cursor-pointer mb-4 hover:bg-blue-200 hover:text-blue-600 py-1 px-8 text-lg`}
            onClick={() => setSelectedMenu("My wishlist")}
          >
            My wishlist
          </p>
          <p
            className={`${
              selectedMenu == "Logout" ? "text-blue-600" : "text-black"
            } cursor-pointer mb-4 hover:bg-blue-200 hover:text-blue-600 py-1 px-8 text-lg`}
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      </div>
      <div className="border flex-1">
        {selectedMenu == "Profile Information" && <ProfileInformation />}
        {selectedMenu == "Manage Address" && <ManageAddress />}
        {selectedMenu == "My wishlist" && <MyWishlist />}
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import AddAddressForm from "./addAddressForm";
import { auth, db } from "@/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const ManageAddress = () => {
  const [addAddress, setAddAddress] = useState(false);
  const [allAddress, setAllAddress] = useState([]);

  useEffect(() => {
    const getAllAddress = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data()["address"]);
        setAllAddress(docSnap.data()["address"]);
      } else {
        console.log("No such document!");
      }
    };
    getAllAddress();
  }, []);

  return (
    <div className="px-8 py-4">
      <p className="font-semibold text-lg mb-4">Manage Address</p>
      <div
        className={`${addAddress && "hidden"} border p-4 cursor-pointer`}
        onClick={() => setAddAddress(!addAddress)}
      >
        <p className="text-blue-600 font-semibold cursor-pointer">
          <span className="text-xl">+</span> ADD A NEW ADDRESS
        </p>
      </div>
      {addAddress && <AddAddressForm setAddAddress={setAddAddress} />}
      <div>
        {allAddress &&
          allAddress.map((address, index) => {
            const {
              addressType,
              name,
              phoneNumber,
              locality,
              area,
              landmark,
              city,
              state,
              pinCode,
              alternatePhone,
            } = address;
            return (
              <div className="border p-4" key={index}>
                <div className="flex justify-between">
                  <span className="bg-gray-300 px-2">
                    {addressType.toUpperCase()}
                  </span>
                  <span className="bg-red">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 128 512"
                      width="0.3em"
                    >
                      <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                    </svg>
                  </span>
                </div>
                <p className="font-semibold my-4">
                  <span className="mr-4">{name}</span>
                  {phoneNumber},<span className="ml-2">{alternatePhone}</span>
                </p>
                <div>
                  <p>
                    <span className="mr-1">{locality}</span>
                    <span className="mr-1">{area}</span>
                    <span className="mr-1">{landmark}</span>
                    <span className="mr-1">{city}</span>
                    <span className="mr-1">{state} -</span>
                    <span className="mr-1 font-semibold">{pinCode}</span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ManageAddress;

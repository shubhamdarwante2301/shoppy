import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "@/firebase-config";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { v4 } from "uuid";

const AddAddressForm = ({ setAddAddress }) => {
  const [address, setAddress] = useState({
    name: "",
    phoneNumber: "",
    pinCode: "",
    locality: "",
    area: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "",
  });

  let name;
  let value;
  const nameRegex = /^[A-Za-z]+$/;
  const phoneRegex = /^[0-9]*$/;
  const handleAddressChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    console.log("handleAddressChange", name, value);
    if (name == "name") {
      if (" " || nameRegex.test(value)) {
        setAddress({ ...address, [name]: value });
      }
    } else if (name == "phoneNumber") {
      if (
        (value == "" || phoneRegex.test(value)) &&
        address.phoneNumber.length < 10
      ) {
        setAddress({ ...address, [name]: value });
      }
    } else if (name == "pinCode") {
      if (
        (value == "" || phoneRegex.test(value)) &&
        address.pinCode.length < 6
      ) {
        setAddress({ ...address, [name]: value });
      }
    } else if (name == "locality") {
      setAddress({ ...address, [name]: value });
    } else if (name == "area") {
      setAddress({ ...address, [name]: value });
    } else if (name == "city") {
      if (" " || nameRegex.test(value)) {
        setAddress({ ...address, [name]: value });
      }
    } else if (name == "state") {
      if (value == "" || nameRegex.test(value)) {
        setAddress({ ...address, [name]: value });
      }
    } else if (name == "landmark") {
      setAddress({ ...address, [name]: value });
    } else if (name == "alternatePhone") {
      if (
        (value == "" || phoneRegex.test(value)) &&
        address.alternatePhone.length < 10
      ) {
        setAddress({ ...address, [name]: value });
      }
    } else if (name == "addressType") {
      setAddress({ ...address, [name]: value });
    }
  };

  const validate = () => {
    const {
      name,
      phoneNumber,
      pinCode,
      locality,
      area,
      city,
      state,
      addressType,
    } = address;
    if (
      !name ||
      !phoneNumber ||
      !pinCode ||
      !locality ||
      !area ||
      !city ||
      !state ||
      !addressType
    ) {
      toast.error("Fill all fields");
      return false;
    } else if (phoneNumber.length < 10) {
      toast.error("Invalid phone number");
      return false;
    }
    return true;
  };

  const handleSubmitAddress = async (address) => {
    const myAddress = { ...address, id: v4() };
    const docRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(docRef, { address: arrayUnion(myAddress) });
  };

  return (
    <div className="border p-4 bg-blue-50">
      <div className=" sm:w-3/4">
        <p className="text-blue-600 font-semibold">ADD A NEW ADDRESS</p>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="border p-2 bg-white">
            <input
              type="text"
              className="outline-0 w-full"
              placeholder="Name"
              name="name"
              value={address.name}
              onChange={handleAddressChange}
            />
          </div>
          <div className="border p-2 bg-white">
            <input
              type="text"
              className="outline-0 w-full"
              placeholder="Phone Number"
              name="phoneNumber"
              value={address.phoneNumber}
              onChange={handleAddressChange}
            />
          </div>
          <div className="border p-2 bg-white">
            <input
              type="text"
              className="outline-0 w-full"
              placeholder="Pin Code"
              name="pinCode"
              value={address.pinCode}
              onChange={handleAddressChange}
            />
          </div>
          <div className="border p-2 bg-white">
            <input
              type="text"
              className="outline-0 w-full"
              placeholder="Locality"
              name="locality"
              value={address.locality}
              onChange={handleAddressChange}
            />
          </div>
        </div>
        <div className="border p-2 bg-white">
          <textarea
            className="w-full outline-0"
            placeholder="Address (Area and Street)"
            name="area"
            value={address.area}
            onChange={handleAddressChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="border p-2 bg-white">
            <input
              type="text"
              className="outline-0 w-full"
              placeholder="City/District/Town"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
            />
          </div>
          <div className="border p-2 bg-white">
            <input
              type="text"
              className="outline-0 w-full"
              placeholder="State"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
            />
          </div>
          <div className="border p-2 bg-white">
            <input
              type="text"
              className="outline-0 w-full"
              placeholder="Landmark (Optional)"
              name="landmark"
              value={address.landmark}
              onChange={handleAddressChange}
            />
          </div>
          <div className="border p-2 bg-white">
            <input
              type="text"
              className="outline-0 w-full"
              placeholder="Alternate Phone (optional)"
              name="alternatePhone"
              value={address.alternatePhone}
              onChange={handleAddressChange}
            />
          </div>
        </div>
        <div className="my-4">
          <p className="my-3">Address Type</p>
          <div>
            <label className="mr-4">
              <input
                className="mr-2"
                type="radio"
                value="home"
                name="addressType"
                checked={address.addressType == "home"}
                onChange={handleAddressChange}
              />
              Home
            </label>
            <label>
              <input
                className="mr-2"
                type="radio"
                value="work"
                name="addressType"
                checked={address.addressType == "work"}
                onChange={handleAddressChange}
              />
              Work
            </label>
          </div>
        </div>

        <div>
          <button
            className="bg-blue-600 text-white font-semibold px-12 py-2"
            onClick={() => {
              if (validate()) {
                handleSubmitAddress(address);
              }
            }}
          >
            SAVE
          </button>
          <button
            className="text-blue-600 font-semibold px-12 py-2"
            onClick={() => setAddAddress(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressForm;

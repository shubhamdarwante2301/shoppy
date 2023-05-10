import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import SignInSignOutLayout from "@/components/signInSignOutLayout/signInSignOutLayout";
import registerImg from "@/assets/register.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase-config";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

const RegisterForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({
    profileInformation: {
      firstName: "",
      lastName: "",
      gender: "",
    },
    address: [],
    wishlist: [],
    myCart: [],
  });
  const [loading, setLoading] = useState(false);

  const handleAddUser = async (id, userData) => {
    try {
      const coll = await setDoc(doc(db, "users", id), userData);
      console.log("User added successfully!", coll);
      router.push("/");
    } catch (error) {
      console.log("error", error);
      toast.error("error in creating user database!");
    }
  };

  const handleRegister = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        toast.success("Successfully registered!");
        handleAddUser(user.uid, userData);
      })
      .catch((error) => {
        console.log("error", error.message);
        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          toast.error("Email is already registered");
        } else {
          toast.error("something went wrong");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validate = () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields!");
      return false;
    } else if (username.length < 6) {
      toast.error("Username must be 6 characters long");
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be 6 characters");
      return false;
    } else if (password != confirmPassword) {
      toast.error("Password and Confirm password not match");
      return false;
    }
    return true;
  };
  return (
    <>
      <div className="flex justify-center">
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          Shoppy
        </span>
      </div>
      <div className="flex flex-col">
        <label className="my-4">
          Username:
          <br />
          <div className="border p-2 mt-1">
            <input
              type="text"
              placeholder="Enter username"
              className="w-full outline-0"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </label>
        <label className="my-4">
          Email:
          <br />
          <div className="border p-2 mt-1">
            <input
              type="text"
              placeholder="Enter email address"
              className="w-full outline-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </label>
        <label className="my-4">
          Passsword:
          <br />
          <div className="border p-2 mt-1">
            <input
              type="password"
              placeholder="Enter the password"
              className="w-full outline-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </label>
        <label className="my-4">
          Confirm Passsword:
          <br />
          <div className="border p-2 mt-1">
            <input
              type="password"
              placeholder="Enter the password again"
              className="w-full outline-0"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </label>
      </div>
      <button
        className="bg-blue-600 text-white w-full py-2 my-4 font-semibold"
        disabled={loading}
        onClick={() => {
          if (validate()) {
            handleRegister();
          }
        }}
      >
        Register
      </button>
      <p className="text-center">
        Already register!{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login
        </span>
      </p>
    </>
  );
};

const Register = () => {
  return (
    <>
      <SignInSignOutLayout img={registerImg} form={<RegisterForm />} />
    </>
  );
};

export default Register;

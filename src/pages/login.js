import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import SignInSignOutLayout from "@/components/signInSignOutLayout/signInSignOutLayout";
import loginImg from "@/assets/login.png";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase-config";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      router.push("/");
    }
  });

  // login functionality
  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        toast.success("Successfully login");
        router.push("/");
      })
      .catch((error) => {
        console.log("error", error.message);
        if (error.message == "Firebase: Error (auth/user-not-found).") {
          toast.error("User not found");
        } else if (error.message == "Firebase: Error (auth/wrong-password).") {
          toast.error("Wrong Password");
        } else {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validate = () => {
    if (!email || !password) {
      toast.error("Please fill all fields!");
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
        <div className="flex justify-between">
          <label>
            <input type="checkbox" className="mr-1" />
            Remeber me
          </label>
          <p className="text-blue-600 cursor-pointer">Forgot Passsword</p>
        </div>
        <button
          className={`bg-blue-600 text-white py-2 my-4 font-semibold ${
            loading && "cursor-wait"
          }`}
          disabled={loading}
          onClick={() => {
            if (validate()) {
              handleLogin();
            }
          }}
        >
          Login
        </button>
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Register!
          </span>
        </p>
      </div>
    </>
  );
};

const Login = () => {
  return (
    <>
      <SignInSignOutLayout img={loginImg} form={<LoginForm />} />
    </>
  );
};

export default Login;

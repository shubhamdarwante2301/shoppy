import React, { useEffect, useState } from "react";
import Image from "next/image";
import avtarImg from "@/assets/avtarImg.png";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase-config";
import { toast } from "react-toastify";

const ProfileInformation = () => {
  const [personaleInfo, setPersonalInfo] = useState();
  const [editPersonaleInfo, setEditPersonalInfo] = useState(false);

  const handleGenderChange = (event) => {
    setPersonalInfo({ ...personaleInfo, gender: event.target.value });
  };

  useEffect(() => {
    if (auth?.currentUser?.uid) {
      const getProfileInformation = async () => {
        const docRef = doc(db, "users", auth?.currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPersonalInfo(docSnap.data()["profileInformation"]);
        } else {
          console.log("No such document!");
        }
      };
      getProfileInformation();
    }
  }, []);

  let name;
  let value;
  const nameRegex = /^[A-Za-z]+$/;
  const handleNameChange = (event) => {
    name = event.target.name;
    value = event.target.value;

    if (name == "firstName") {
      if (nameRegex.test(value)) {
        setPersonalInfo({ ...personaleInfo, firstName: value });
      }
    } else if (name == "lastName") {
      if (nameRegex.test(value)) {
        setPersonalInfo({ ...personaleInfo, lastName: value });
      }
    }
  };

  const validate = () => {
    const { firstName, lastName, gender } = personaleInfo;
    if (!firstName || !lastName || !gender) {
      toast.error("Fill all fields");
      return false;
    }
    return true;
  };

  const handleUpdateProfileInfo = async () => {
    const myDocRef = doc(db, "users", auth?.currentUser?.uid);
    await updateDoc(myDocRef, { profileInformation: personaleInfo });
    setEditPersonalInfo(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-3/4 my-4 flex flex-col items-center">
        <div className="flex justify-center">
          <Image
            src={avtarImg}
            alt="Profile Photo"
            width={100}
            className="rounded-full"
          />
        </div>
        <div className="my-8">
          <div className="flex items-center my-3">
            <p className="font-semibold text-lg mr-4">Personal Information</p>
            <p
              className="text-blue-600 cursor-pointer"
              onClick={() => setEditPersonalInfo(!editPersonaleInfo)}
            >
              Edit
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div
              className={`${
                !editPersonaleInfo &&
                "bg-slate-200 cursor-not-allowed text-gray-500"
              } border py-1 px-2 my-4 sm:my-0 sm:mr-4`}
            >
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className={`${
                  !editPersonaleInfo && "cursor-not-allowed"
                } outline-0`}
                disabled={!editPersonaleInfo}
                onChange={handleNameChange}
                value={personaleInfo?.firstName}
              />
            </div>
            <div
              className={`${
                !editPersonaleInfo &&
                "bg-slate-200 cursor-not-allowed text-gray-500"
              } border py-1 px-2`}
            >
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={`${
                  !editPersonaleInfo && "cursor-not-allowed"
                } outline-0`}
                disabled={!editPersonaleInfo}
                onChange={handleNameChange}
                value={personaleInfo?.lastName}
              />
            </div>
          </div>
          {/* gender */}
          <div className="my-4">
            <p className="my-3">Your Gender</p>
            <div>
              <label
                className={`${
                  !editPersonaleInfo && "cursor-not-allowed text-gray-400"
                } mr-4`}
              >
                <input
                  className={`${
                    !editPersonaleInfo && "cursor-not-allowed"
                  } mr-2`}
                  type="radio"
                  value="male"
                  disabled={!editPersonaleInfo}
                  checked={personaleInfo?.gender == "male"}
                  onChange={handleGenderChange}
                />
                Male
              </label>
              <label
                className={`${
                  !editPersonaleInfo && "cursor-not-allowed text-gray-400"
                }`}
              >
                <input
                  className={`${
                    !editPersonaleInfo && "cursor-not-allowed"
                  } mr-2`}
                  type="radio"
                  value="female"
                  disabled={!editPersonaleInfo}
                  checked={personaleInfo?.gender == "female"}
                  onChange={handleGenderChange}
                />
                Female
              </label>
            </div>
          </div>
          <div>
            {editPersonaleInfo && (
              <>
                <button
                  className="bg-blue-600 text-white px-6 py-2"
                  onClick={() => {
                    if (validate()) {
                      handleUpdateProfileInfo();
                    }
                  }}
                >
                  SAVE
                </button>
                <button
                  className="px-6 py-2 border ml-4 hover:border-black"
                  onClick={() => setEditPersonalInfo(!editPersonaleInfo)}
                >
                  CANCEL
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;

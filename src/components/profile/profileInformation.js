import React, { useEffect, useState } from "react";
import Image from "next/image";
import avtarImg from "@/assets/avtarImg.png";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/firebase-config";
import { toast } from "react-toastify";
import eyeImg from "@/assets/svg/eye.svg";
import trashCan from "@/assets/svg/trashCan.svg";
import cross from "@/assets/svg/cross.svg";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

const ProfileInformation = () => {
  const [currentUser, setCurrentUser] = useState();
  const [personaleInfo, setPersonalInfo] = useState();
  const [newProfilePhoto, setNewProfilePhoto] = useState();
  const [editPersonaleInfo, setEditPersonalInfo] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleGenderChange = (event) => {
    setPersonalInfo({ ...personaleInfo, gender: event.target.value });
  };

  useEffect(() => {
    // console.log("auth?.currentUser",auth?.currentUser);
    setCurrentUser(auth?.currentUser);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      // console.log("currentUser",currentUser);
      setCurrentUser(currentUser);
    });
  }, []);

  useEffect(() => {
    if (auth?.currentUser?.uid) {
      const getProfileInformation = async () => {
        const docRef = doc(db, "users", auth?.currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("user data", docSnap.data()["profileInformation"]);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setNewProfilePhoto(selectedFile);
    // console.log("selected file",selectedFile);
  };

  const handleUpdateProfileInfo = async () => {
    const myDocRef = doc(db, "users", auth?.currentUser?.uid);
    await updateDoc(myDocRef, { profileInformation: personaleInfo });
    setEditPersonalInfo(false);

    if (newProfilePhoto) {
      const storageRef = ref(storage, `/files/${newProfilePhoto.name}`);
      const uplodePhoto = uploadBytesResumable(storageRef, newProfilePhoto);
      uplodePhoto.on(
        "file upload status",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("progress", progress);
        },
        (error) => {
          toast.error("error in uploading profile photo");
        },
        () => {
          getDownloadURL(uplodePhoto.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            updateProfile(auth.currentUser, {
              displayName: personaleInfo.firstName,
              photoURL: downloadURL,
            })
              .then((response) => {
                toast.success("Profile photo updated successfully!");
                // console.log("response", response);
                // onAuthStateChanged(auth, (currentUser) => {
                //   console.log("currentUser",currentUser);
                //   setCurrentUser(currentUser);
                // });
              })
              .catch((error) => {
                console.log("profile update error", error);
              });
          });
        }
      );
    }
  };

  const deleteProfilePhoto = () => {
    const profilePhotoRef = storage.getInstance().getReferenceFromURL(currentUser?.photoURL)
    console.log("profilePhotoRef", profilePhotoRef);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-3/4 my-4 flex flex-col items-center">
        <div className="relative flex justify-center">
          {/* modal to show profile image */}
          {profileModalOpen && (
            <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/40 z-50">
              <div className="min-w-[200px]">
                <div className="flex justify-end">
                  <Image
                    src={cross}
                    alt="trash image"
                    width={15}
                    height={15}
                    className="cursor-pointer"
                    onClick={() => setProfileModalOpen(false)}
                  />
                </div>
                <Image
                  src={currentUser?.photoURL || avtarImg}
                  alt="Profile Photo"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
            </div>
          )}
          <div className="absolute w-full h-full flex justify-center hover:bg-black/30 rounded-full group">
            <Image
              src={eyeImg}
              alt="eye image to open profile photo"
              width={15}
              height={15}
              className="mr-2 cursor-pointer hidden group-hover:block"
              onClick={() => setProfileModalOpen(true)}
            />
            <Image
              src={trashCan}
              alt="trash image"
              width={10}
              height={10}
              className="cursor-pointer hidden group-hover:block"
              // onClick={deleteProfilePhoto}
            />
          </div>
          <Image
            src={currentUser?.photoURL || avtarImg}
            alt="Profile Photo"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        {editPersonaleInfo && (
          <input
            type="file"
            name="fileupload"
            accept=".jpg, .jpeg, .png"
            className="my-4 ml-14"
            onChange={handleFileChange}
          />
        )}
        <div className="my-8">
          <div className="flex items-center my-3">
            <p className="font-semibold text-lg mr-4">Personal Information</p>
            {!editPersonaleInfo && (
              <p
                className="text-blue-600 cursor-pointer"
                onClick={() => setEditPersonalInfo(!editPersonaleInfo)}
              >
                Edit
              </p>
            )}
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

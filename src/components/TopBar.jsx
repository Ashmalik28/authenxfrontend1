import React from "react";
import logo from "../../images/AuthenXLogo.webp";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { shortenAddress } from "../utils/shortenAddress";
import { fetchProfile } from "../../api";
import { useEffect, useState } from "react";

const TopBar = ({ toggleMenu, setToggleMenu, userType, currentAccount }) => {
  const [profilePicture, setProfilePicture] = useState(
    () => localStorage.getItem("profilePicture") || "",
  );

  useEffect(() => {
    const handleProfilePictureUpdate = () => {
      const picture = localStorage.getItem("profilePicture");

      setProfilePicture(picture || "");
    };

    window.addEventListener(
      "profilePictureUpdated",
      handleProfilePictureUpdate,
    );

    return () => {
      window.removeEventListener(
        "profilePictureUpdated",
        handleProfilePictureUpdate,
      );
    };
  }, []);

  useEffect(() => {
    const getProfilePicture = async () => {
      try {
        const cachedPicture = localStorage.getItem("profilePicture");
        if (cachedPicture) {
          setProfilePicture(cachedPicture);
          return;
        }

        const data = await fetchProfile();
        const picture = data?.profile?.profilePicture || "";

        if (picture) {
          localStorage.setItem("profilePicture", picture);
          setProfilePicture(picture);
        }
      } catch (error) {
        console.error("Failed to fetch profile picture:", error);
      }
    };

    getProfilePicture();
  }, []);
  return (
    <div className="w-full bg-white fixed top-0 flex justify-between items-center z-60 px-2 h-[60px] xs:h-[60px]">
      <div className="lg:hidden flex text-black items-center relative">
        {!toggleMenu ? (
          <HiMenuAlt4
            fontSize={24}
            className="cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        ) : (
          <AiOutlineClose
            fontSize={24}
            className="cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
      </div>

      <div>
        <img
          src={logo}
          alt="logo"
          className="lg:w-40 lg:h-10 w-24 h-6 cursor-pointer"
        />
      </div>

      <div className="flex justify-center items-center">
        {userType === "verifier" ? (
          ""
        ) : (
          <div className="text-white flex justify-center items-center gap-2 font-semibold outline-1 outline-gray-500 text-lg px-5 py-1 mr-5 bg-gray-500 rounded-3xl">
            <div className="flex justify-center items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                />
              </svg>

              {shortenAddress(currentAccount)}
            </div>
          </div>
        )}

        <div className="border-1 rounded-full lg:h-12 lg:w-12 w-6 h-6 bg-gray-700 text-white flex justify-center items-center">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="lg:size-7 size-4"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;

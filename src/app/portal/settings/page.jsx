"use client";

import React from "react";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { useState } from "react";
import { Button, Select } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Image from "next/image";
// import {UserButton, UserProfile} from "@clerk/nextjs";
//
// const DotIcon = () => {
//     return (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
//             <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
//         </svg>
//     )
// }
//
// const CustomPage = () => {
//     return (
//         <div>
//             <h1>Custom Profile Page</h1>
//             <p>This is the custom profile page</p>
//         </div>
//     )
// }

const Settings = () => {
  const BANKS = [
    "Bank of Ceylon",
    "Commercial Bank",
    "DFCC Bank",
    "HDFC Bank",
    "Hatton National Bank",
    "National Development Bank(NDB)",
    "Nations trust Bank(NTB)",
    "Pan Asia Bank",
    "People's Bank",
    "Sampath Bank",
    "Seylan Bank",
    "Union Bank",
  ];

  const [bankDetails, setBankDetails] = useState("1234-5678-9012-3456");
  const [imageSrc, setImageSrc] = useState("/user2.jpg");
  const [view, setView] = useState("account");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handlePasswordClick = () => {
    setView("password");
  };

  const handleBackToAccount = () => {
    setView("account");
  };

  const handleUpdateBankDetails = () => {
    setBankDetails(bankDetails);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  let role = "TUTOR";

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4">
      <h1 className="hidden md:block text-lg font-semibold mb-4">Settings</h1>
      {role === "TUTOR" && (
        <div className="flex p-3 ml-12 lg:flex-row sm:flex-col">
          <div className="flex flex-col items-center text-center mt-10 w-full lg:w-1/4 lg:sticky">
            <div>
              {/*<Image src={imageSrc} width={40} height={40} />*/}
              <img
                src={imageSrc}
                alt="User Image"
                className="mb-4  w-40 lg:w-56 rounded-full shadow-md"
              />
              <label
                htmlFor="imageUpload"
                className="mt-4 bg-gray-800 text-white text-sm px-5 py-2 rounded-full cursor-pointer hover:bg-gray-700"
              >
                Change
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <p className="mt-4 font-semibold text-base">
                Rachel Daves
              </p>
            </div>

            <div className="grid grid-cols-1 divide-y divide-neutral-300 border border-neutral-200 mt-8 w-full rounded-lg shadow-sm">
              <div
                className="text-sm p-3 hover:font-medium hover:bg-blue-100 transition-all cursor-pointer"
                aria-label="Account"
                onClick={() => setView("account")}
              >
                Account
              </div>
              <div
                className="text-sm p-3 hover:font-medium hover:bg-blue-100 transition-all cursor-pointer"
                aria-label="Password"
                onClick={() => setView("password")}
              >
                Password
              </div>
              <div
                className="text-sm p-3 hover:font-medium hover:bg-blue-100 transition-all cursor-pointer"
                aria-label="Billing"
                onClick={() => setView("billing")}
              >
                Billing Details
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 sm:w-full bg-white shadow-lg rounded-lg p-8 mx-auto my-5">
            {view === "account" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-6">
                  Account Settings
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      maxLength={20}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      maxLength={20}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="address"
                      className="text-sm font-medium mb-2"
                    >
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleUpdateBankDetails} // Update bank details directly
                    className="w-52 bg-black text-white my-1 rounded-md text-sm p-[10px]"
                  >
                    UPDATE
                  </button>
                  <button
                    type="button"
                    className="w-52 my-1 rounded-md text-sm p-[10px] rounded-lg hover:bg-red-200 hover:font-bold transition duration-200 ease-in-out border-2 border-black"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {view == "password" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-6">
                  Reset Password
                </h2>

                <div className="flex flex-col mb-6 relative">
                  <label
                    htmlFor="currentPassword"
                    className="text-sm font-medium mb-2"
                  >
                    Current Password
                  </label>
                  <div className="flex">
                    <input
                      id="currentPassword"
                      type={visible ? "text" : "password"}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                    <div
                      className=" cursor-pointer text-gray-600 p-3"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="newPassword"
                    className="text-sm font-medium mb-2"
                  >
                    New Password
                  </label>
                  <div className="flex">
                    <input
                      id="newPassword"
                      type={visible ? "text" : "password"}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                    <div
                      className="cursor-pointer text-gray-600 p-3"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium mb-2"
                  >
                    Confirm New Password
                  </label>
                  <div className="flex">
                    <input
                      id="confirmPassword"
                      type={visible ? "text" : "password"}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                    <div
                      className="cursor-pointer text-gray-600 p-3"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    className="w-52 bg-black text-white my-1 rounded-md text-sm p-[10px]"
                  >
                    Save New Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("account")}
                    className="w-52 my-1 rounded-md text-sm p-[10px] rounded-lg hover:bg-red-200 hover:font-bold transition duration-200 ease-in-out border-2 border-black"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {view == "billing" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="nameBank"
                      className="text-sm font-medium mb-2"
                    >
                      Name of bank account holder
                    </label>
                    <input
                      id="nameBank"
                      type="text"
                      maxLength={30}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="bank" className="text-sm font-medium mb-2">
                      Bank
                    </label>
                    <Select
                      placeholder="Select your Bank name"
                      options={BANKS.map((bank) => {
                        return {
                          value: bank,
                        };
                      })}
                    ></Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col mb-6">
                    <label
                      htmlFor="accountNum"
                      className="text-sm font-medium mb-2"
                    >
                      Account Number
                    </label>
                    <input
                      id="accountNum"
                      type="text"
                      maxLength={30}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                    {/* <input
                            id="bankdetails"
                            type="text"
                            value={bankDetails}
                            onChange={(e) => setBankDetails(e.target.value)} // Directly set the bank details
                            maxLength={19}
                            className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950"
                          /> */}
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleUpdateBankDetails} // Update bank details directly
                    className="w-52 bg-black text-white my-1 rounded-md text-sm p-[10px]"
                  >
                    UPDATE
                  </button>
                  <button
                    type="button"
                    className="w-52 my-1 rounded-md text-sm p-[10px] rounded-lg hover:bg-red-200 hover:font-bold transition duration-200 ease-in-out border-2 border-black"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {role === "STUDENT" && (
        <div className="flex p-3 ml-12 lg:flex-row sm:flex-col">
          <div className="flex flex-col items-center text-center mt-10 w-full lg:w-1/4 lg:sticky">
            <div>
              <p className="mt-4 text-medium text-black font-bold">
                Rachel Daves
              </p>
            </div>

            <div className="grid grid-cols-1 divide-y divide-neutral-300 border border-neutral-200 mt-8 w-full rounded-lg shadow-sm">
              <div
                className="text-medium p-4 hover:font-medium hover:bg-blue-100 transition-all cursor-pointer"
                aria-label="Account"
                onClick={() => setView("account")}
              >
                Account
              </div>
              <div
                className="text-medium p-4 hover:font-medium hover:bg-blue-100 transition-all cursor-pointer"
                aria-label="Password"
                onClick={handlePasswordClick}
              >
                Password
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 sm:w-full bg-white shadow-lg rounded-lg p-8 mx-auto my-5">
            {view === "account" ? (
              <>
                <h2 className="text-xl font-semibold text-gray-700 mb-6">
                  Account Settings
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      maxLength={20}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                      //   className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-all w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      maxLength={20}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                      //   className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-all w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="address"
                      className="text-sm font-medium mb-2"
                    >
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                      //   className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition w-full"
                    />
                  </div>
                  {/* <div className="flex flex-col">
                          <label htmlFor="phone" className="text-sm font-medium mb-2">
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                            //   className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-all w-full"
                          />
                        </div> */}
                </div>
                <div className="flex flex-col mb-6">
                  <label htmlFor="bio" className="text-sm font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    maxLength={500}
                    className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    // className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-all w-full"
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    className="w-52 bg-black text-white my-1 rounded-md text-sm p-[10px]"
                    //className="bg-blue-500 text-white text-m font-semibold p-4 w-64 rounded-lg hover:bg-blue-600 hover:font-bold transition duration-200 ease-in-out shadow-md"
                  >
                    UPDATE
                  </button>
                  <button
                    type="button"
                    className="w-52 my-1 rounded-md text-sm p-[10px] rounded-lg hover:bg-red-200 hover:font-bold transition duration-200 ease-in-out border-2 border-black"
                    //className="bg-gray-100 text-gray-700 text-m font-semibold p-4 w-64 rounded-lg hover:bg-red-200 hover:font-bold transition duration-200 ease-in-out shadow-md border-2 border-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-700 mb-6">
                  Reset Password
                </h2>

                <div className="flex flex-col mb-6 relative">
                  <label
                    htmlFor="currentPassword"
                    className="text-sm font-medium mb-2"
                  >
                    Current Password
                  </label>
                  <div className="flex">
                    <input
                      id="currentPassword"
                      type={visible ? "text" : "password"}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                      // className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-all w-full pr-10"
                    />
                    <div
                      className=" cursor-pointer text-gray-600 p-3"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="newPassword"
                    className="text-sm font-medium mb-2"
                  >
                    New Password
                  </label>
                  <div className="flex">
                    <input
                      id="currentPassword"
                      type={visible ? "text" : "password"}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                      //className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-all w-full pr-10"
                    />
                    <div
                      className=" cursor-pointer text-gray-600 p-3"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium mb-2"
                  >
                    Confirm New Password
                  </label>
                  <div className="flex">
                    <input
                      id="currentPassword"
                      type={visible ? "text" : "password"}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                      //className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-all w-full pr-10"
                    />
                    <div
                      className=" cursor-pointer text-gray-600 p-3"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    className="w-52 bg-black text-white my-1 rounded-md text-sm p-[10px]"
                    //className="bg-blue-500 text-white text-m font-semibold p-4 w-64 rounded-lg hover:bg-blue-600 hover:font-bold transition duration-200 ease-in-out shadow-md"
                  >
                    Save New Password
                  </button>
                  <button
                    type="button"
                    onClick={handleBackToAccount}
                    className="w-52 my-1 rounded-md text-sm p-[10px] rounded-lg hover:bg-red-200 hover:font-bold transition duration-200 ease-in-out border-2 border-black"
                    //className="bg-gray-100 text-gray-700 text-m font-semibold p-4 w-64 rounded-lg hover:bg-red-200 hover:font-bold transition duration-200 ease-in-out shadow-md border-2 border-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

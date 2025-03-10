"use client";

import React from "react";
import { useState } from "react";
import { Button, Select } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import {
  useUpdateBankDetails,
  useUpdatePassword,
  useUpdateUser,
  useUserById,
} from "@/hooks/useUsers";
import { useCurrentUser } from "@/util/auth";

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

  const user = useCurrentUser();
  const userId = user?.id;
  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useUserById(userId);

  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [branch, setBranch] = useState("");
  const [bank, setBank] = useState("");
  const [view, setView] = useState("account");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState(userData?.data.firstName);
  const [lastName, setLastName] = useState(userData?.data.firstName);
  const [phone, setPhone] = useState(userData?.data.phone);
  const [address, setAddress] = useState(userData?.data.address);
  const [description, setDescription] = useState(
    userData?.data.Tutor.description
  );
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(
    userData?.data.profilePhotoUrl
  );
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const useUpdatePasswordMutation = useUpdatePassword();
  const useUpdateBankDetailsMutation = useUpdateBankDetails();
  const useUpdateUserMutation = useUpdateUser();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(`/settings/${userId}`);
  //       const data = await response.json();
  //       setUserData(data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (userId) {
  //     fetchUserData();
  //   }
  // }, [userId]);

  const handlePasswordClick = () => {
    setView("password");
  };

  const handleBackToAccount = () => {
    setView("account");
  };

  const handleUpdateBankDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await useUpdateBankDetailsMutation.mutateAsync({
        bankDetails: {
          accountName,
          accountNumber,
          bank,
          branch,
        },
      });
    } catch (error) {
      setError(error.response?.data?.message || "Unsuccesfull !!!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhotoUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await useUpdateUserMutation.mutateAsync({
        userData: {
          firstName,
          lastName,
          address,
          phone,
          profilePhotoUrl,
          description,
        },
      });
    } catch (error) {
      setError(error.response?.data?.message || "Unsuccesfull !!!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (confirmPassword !== newPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await useUpdatePasswordMutation.mutateAsync({
        password: {
          oldPassword,
          newPassword,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Unsuccesfull !!!");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (userError) {
    return <div>Error loading tutor details</div>;
  }

  let role = "STUDENT";

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4">
      <h1 className="hidden md:block text-lg font-semibold mb-4">Settings</h1>
      {role === "TUTOR" && (
        <div className="flex p-3 ml-12 lg:flex-row sm:flex-col">
          <div className="flex flex-col items-center text-center mt-10 w-full lg:w-1/4 lg:sticky">
            <div>
              <img
                src={
                  profilePhotoUrl ||
                  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                }
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
              <p className="mt-4 font-semibold text-base">Rachel Daves</p>
            </div>

            <div className="grid grid-cols-1 divide-y divide-neutral-300 border border-neutral-200 mt-8 w-full rounded-lg shadow-sm">
              <div
                className="text-sm p-3 hover:font-medium hover:bg-gray-100 transition-all cursor-pointer"
                aria-label="Account"
                onClick={() => setView("account")}
              >
                Account
              </div>
              <div
                className="text-sm p-3 hover:font-medium hover:bg-gray-100 transition-all cursor-pointer"
                aria-label="Password"
                onClick={() => setView("password")}
              >
                Password
              </div>
              <div
                className="text-sm p-3 hover:font-medium hover:bg-gray-100 transition-all cursor-pointer"
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
                  Profile
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
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      maxLength={20}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                  </div>
                </div>
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                  </div>
                </div> */}
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="desc" className="text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      id="desc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-32 resize-none rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleUpdateUser} // Update bank details directly
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
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      type={visible ? "text" : "password"}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                    <div
                      className=" cursor-pointer text-gray-600 px-3"
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
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type={visible ? "text" : "password"}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                    <div
                      className="cursor-pointer text-gray-600 px-3"
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={visible ? "text" : "password"}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                    <div
                      className="cursor-pointer text-gray-600 px-3"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="block text-sm text-red-400">{error}</div>
                )}
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleChangePassword}
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
                <h2 className="text-xl font-semibold text-gray-700 mb-6">
                  Billing Details
                </h2>
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
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
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
                      value={bank}
                      onChange={(value) => setBank(value)}
                    ></Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col mb-6">
                    <label
                      htmlFor="branch"
                      className="text-sm font-medium mb-2"
                    >
                      Branch
                    </label>
                    <input
                      id="branch"
                      type="text"
                      maxLength={30}
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                  </div>

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
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
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
              <img
                src={
                  profilePhotoUrl ||
                  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                }
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
              <p className="mt-4 font-semibold text-base">{firstName + " " + lastName}</p>
            </div>
            <div className="grid grid-cols-1 divide-y divide-neutral-300 border border-neutral-200 mt-8 w-full rounded-lg shadow-sm">
              {/* <div className="grid grid-cols-1 divide-y divide-neutral-300 border border-neutral-200 mt-8 w-full rounded-lg shadow-sm"> */}
              <div
                className="text-sm p-3 hover:font-medium hover:bg-gray-100 transition-all cursor-pointer"
                aria-label="Account"
                onClick={() => setView("account")}
              >
                Account
              </div>
              <div
                className="text-sm p-3 hover:font-medium hover:bg-gray-100 transition-all cursor-pointer"
                aria-label="Password"
                onClick={handlePasswordClick}
              >
                Password
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 sm:w-full bg-white shadow-lg rounded-lg p-8 mx-auto my-5">
            {view === "account" ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-6">
                  Profile
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
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="desc" className="text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      id="desc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-32 resize-none rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    ></textarea>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleUpdateUser}
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
            ) : (
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
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      type={visible ? "text" : "password"}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                    <div
                      className=" cursor-pointer text-gray-600 px-3"
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
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type={visible ? "text" : "password"}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                    <div
                      className="cursor-pointer text-gray-600 px-3"
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={visible ? "text" : "password"}
                      className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                    />
                    <div
                      className="cursor-pointer text-gray-600 px-3"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="block text-sm text-red-400">{error}</div>
                )}
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleChangePassword}
                    className="w-52 bg-black text-white my-1 rounded-md text-sm p-[10px]"
                  >
                    Save New Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("account")}
                    className="w-52 my-1  text-sm p-[10px] rounded-md hover:bg-red-200 hover:font-bold transition duration-200 ease-in-out border-2 border-black"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              // <div>
              //   <h2 className="text-xl font-semibold text-gray-700 mb-6">
              //     Reset Password
              //   </h2>

              //   <div className="flex flex-col mb-6 relative">
              //     <label
              //       htmlFor="currentPassword"
              //       className="text-sm font-medium mb-2"
              //     >
              //       Current Password
              //     </label>
              //     <div className="flex">
              //       <input
              //         id="currentPassword"
              //         type={visible ? "text" : "password"}
              //         value={oldPassword}
              //         onChange={(e) => setOldPassword(e.target.value)}
              //         className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              //       />
              //       <div
              //         className=" cursor-pointer text-gray-600 px-3"
              //         onClick={() => setVisible(!visible)}
              //       >
              //         {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              //       </div>
              //     </div>
              //   </div>

              //   <div className="flex flex-col mb-6">
              //     <label
              //       htmlFor="newPassword"
              //       className="text-sm font-medium mb-2"
              //     >
              //       New Password
              //     </label>
              //     <div className="flex">
              //       <input
              //         id="newPassword"
              //         type={visible ? "text" : "password"}
              //         value={newPassword}
              //         onChange={(e) => setNewPassword(e.target.value)}
              //         className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              //       />
              //       <div
              //         className="cursor-pointer text-gray-600 px-3"
              //         onClick={() => setVisible(!visible)}
              //       >
              //         {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              //       </div>
              //     </div>
              //   </div>

              //   <div className="flex flex-col mb-6">
              //     <label
              //       htmlFor="confirmPassword"
              //       className="text-sm font-medium mb-2"
              //     >
              //       Confirm New Password
              //     </label>
              //     <div className="flex">
              //       <input
              //         id="confirmPassword"
              //         type={visible ? "text" : "password"}
              //         value={confirmPassword}
              //         onChange={(e) => setConfirmPassword(e.target.value)}
              //         className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              //       />
              //       <div
              //         className="cursor-pointer text-gray-600 px-3"
              //         onClick={() => setVisible(!visible)}
              //       >
              //         {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              //       </div>
              //     </div>
              //   </div>

              //   <div className="flex gap-4 mt-6">
              //     <button
              //       type="button"
              //       onClick={handleChangePassword}
              //       className="w-52 bg-black text-white my-1 rounded-md text-sm p-[10px]"
              //     >
              //       Save New Password
              //     </button>
              //     <button
              //       type="button"
              //       onClick={() => setView("account")}
              //       className="w-52 my-1 rounded-md text-sm p-[10px] rounded-lg hover:bg-red-200 hover:font-bold transition duration-200 ease-in-out border-2 border-black"
              //     >
              //       Cancel
              //     </button>
              //   </div>
              // </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

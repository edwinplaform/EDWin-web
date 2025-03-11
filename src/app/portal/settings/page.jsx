"use client";

import React, {useEffect, useState} from "react";
import {Button, Select, Spin} from "antd";
import {EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons";
import {
    useUpdateBankDetails,
    useUpdatePassword,
    useUpdateUser,
    useUserById,
} from "@/hooks/useUsers";
import {useCurrentUser} from "@/util/auth";
import ProfilePicture from "@/components/ProfilePicture";

const BANKS = [
    "Bank of Ceylon",
    "Commercial Bank",
    "DFCC Bank",
    "HDFC Bank",
    "Hatton National Bank",
    "National Development Bank(NDB)",
    "Nations Trust Bank(NTB)",
    "Pan Asia Bank",
    "People's Bank",
    "Sampath Bank",
    "Seylan Bank",
    "Union Bank",
];

const Settings = () => {
    const user = useCurrentUser();
    const userId = user?.id;
    const userRole = user?.role || "STUDENT";
    const {data: userData, error: userError, isLoading: isUserLoading} = useUserById(userId);

    console.log("----------userid:", userId, "role:", userRole);

    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [branch, setBranch] = useState("");
    const [bank, setBank] = useState("");
    const [view, setView] = useState("account");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const useUpdatePasswordMutation = useUpdatePassword();
    const useUpdateBankDetailsMutation = useUpdateBankDetails();
    const useUpdateUserMutation = useUpdateUser();

    // Update state when userData is loaded
    useEffect(() => {
        if (userData?.data) {
            setFirstName(userData.data.firstName || "");
            setLastName(userData.data.lastName || "");
            setPhone(userData.data.phone || "");
            setAddress(userData.data.address || "");
            setDescription(userData.data.Tutor?.description || "");
            setProfilePhotoUrl(userData.data.profilePhotoUrl || "");
            if (userData.data.Tutor?.bankDetails) {
                setAccountName(userData.data.Tutor.bankDetails.holderName || "");
                setAccountNumber(userData.data.Tutor.bankDetails.accountNumber || "");
                setBank(userData.data.Tutor.bankDetails.bank || "");
                setBranch(userData.data.Tutor.bankDetails.branch || "");
            }
        }
    }, [userData]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await useUpdateUserMutation.mutateAsync({
                userId,
                userData: {
                    firstName,
                    lastName,
                    address,
                    phone,
                    profilePhotoUrl,
                    description: userRole === "TUTOR" ? description : undefined,
                },
            });
        } catch (err) {
            setError(err.response?.data?.message || "Update failed!");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateBankDetails = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await useUpdateBankDetailsMutation.mutateAsync({
                userId,
                bankDetails: {
                    holderName: accountName,
                    accountNumber,
                    bank,
                    branch,
                },
            });
        } catch (err) {
            setError(err.response?.data?.message || "Update failed!");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }
        try {
            await useUpdatePasswordMutation.mutateAsync({
                userId,
                password: {oldPassword, newPassword},
            });
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError(err.response?.data?.message || "Password change failed!");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isUserLoading) return <div className="flex justify-center items-center min-h-screen">
        <Spin size="large"/>
    </div>;
    if (userError) return <div>Error loading user details: {userError.message}</div>;
    if (!userId) return <div>Please log in to view settings.</div>;

    const renderSidebar = () => (
        <div className="flex flex-col items-center text-center mt-10 w-full lg:w-1/4 lg:sticky">
            <div>
                <img
                    src={profilePhotoUrl || "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"}
                    alt="User Image"
                    className="mb-4 w-40 lg:w-56 rounded-full shadow-md"
                />
                <p className="mt-4 font-semibold text-base">{firstName} {lastName}</p>
            </div>
            <div
                className="grid grid-cols-1 divide-y divide-neutral-300 border border-neutral-200 mt-8 w-full rounded-lg shadow-sm">
                <div
                    className="text-sm p-3 hover:font-medium hover:bg-gray-100 transition-all cursor-pointer"
                    onClick={() => setView("account")}
                >
                    Account
                </div>
                <div
                    className="text-sm p-3 hover:font-medium hover:bg-gray-100 transition-all cursor-pointer"
                    onClick={() => setView("password")}
                >
                    Password
                </div>
                {userRole === "TUTOR" && (
                    <div
                        className="text-sm p-3 hover:font-medium hover:bg-gray-100 transition-all cursor-pointer"
                        onClick={() => setView("billing")}
                    >
                        Billing Details
                    </div>
                )}
            </div>
        </div>
    );

    const renderAccountView = () => (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <ProfilePicture setValue={(key, value) => setProfilePhotoUrl(value)}/>
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium mb-2">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        maxLength={20}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-sm font-medium mb-2">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        maxLength={20}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm font-medium mb-2">Phone</label>
                    <input
                        id="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="address" className="text-sm font-medium mb-2">Address</label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="flex flex-col">
                    <label htmlFor="desc" className="text-sm font-medium mb-2">Description</label>
                    <textarea
                        id="desc"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-32 resize-none rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950"
                    />
                </div>
            </div>
            <div className="flex gap-4 mt-6">
                <button
                    type="button"
                    onClick={handleUpdateUser}
                    disabled={isLoading}
                    className="w-52 bg-black text-white my-1 rounded-md text-sm p-[10px] disabled:opacity-50"
                >
                    {isLoading ? "Updating..." : "UPDATE"}
                </button>
                <button
                    type="button"
                    className="w-52 my-1 rounded-md text-sm p-[10px] hover:bg-red-200 hover:font-bold transition duration-200 ease-in-out border-2 border-black"
                >
                    Cancel
                </button>
            </div>
        </div>
    );

    const renderPasswordView = () => (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Reset Password</h2>
            <div className="flex flex-col mb-6">
                <label htmlFor="currentPassword" className="text-sm font-medium mb-2">Current Password</label>
                <div className="flex">
                    <input
                        id="currentPassword"
                        type={visible ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950"
                    />
                    <div className="cursor-pointer text-gray-600 px-3" onClick={() => setVisible(!visible)}>
                        {visible ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-6">
                <label htmlFor="newPassword" className="text-sm font-medium mb-2">New Password</label>
                <div className="flex">
                    <input
                        id="newPassword"
                        type={visible ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950"
                    />
                    <div className="cursor-pointer text-gray-600 px-3" onClick={() => setVisible(!visible)}>
                        {visible ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-6">
                <label htmlFor="confirmPassword" className="text-sm font-medium mb-2">Confirm New Password</label>
                <div className="flex">
                    <input
                        id="confirmPassword"
                        type={visible ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950"
                    />
                    <div className="cursor-pointer text-gray-600 px-3" onClick={() => setVisible(!visible)}>
                        {visible ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-6">
                <button
                    type="button"
                    onClick={handleChangePassword}
                    disabled={isLoading}
                    className="w-52 bg-black text-white my-1 rounded-md text-sm p-[10px] disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Save New Password"}
                </button>
                <button
                    type="button"
                    onClick={() => setView("account")}
                    className="w-52 my-1 rounded-md text-sm p-[10px] hover:bg-red-200 hover:font-bold transition duration-200 ease-in-out border-2 border-black"
                >
                    Cancel
                </button>
            </div>
        </div>
    );

    const renderBillingView = () => (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Billing Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                    <label htmlFor="nameBank" className="text-sm font-medium mb-2">Name of Bank Account Holder</label>
                    <input
                        id="nameBank"
                        type="text"
                        maxLength={30}
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="bank" className="text-sm font-medium mb-2">Bank</label>
                    <Select
                        placeholder="Select your Bank name"
                        options={BANKS.map((bank) => ({value: bank}))}
                        value={bank}
                        onChange={(value) => setBank(value)}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                    <label htmlFor="branch" className="text-sm font-medium mb-2">Branch</label>
                    <input
                        id="branch"
                        type="text"
                        maxLength={30}
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="accountNum" className="text-sm font-medium mb-2">Account Number</label>
                    <input
                        id="accountNum"
                        type="text"
                        maxLength={30}
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950"
                    />
                </div>
            </div>
            <div className="flex gap-4 mt-6">
                <button
                    type="button"
                    onClick={handleUpdateBankDetails}
                    disabled={isLoading}
                    className="w-52 bg-black text-white my-1 rounded-md text-sm p-[10px] disabled:opacity-50"
                >
                    {isLoading ? "Updating..." : "UPDATE"}
                </button>
                <button
                    type="button"
                    className="w-52 my-1 rounded-md text-sm p-[10px] hover:bg-red-200 hover:font-bold transition duration-200 ease-in-out border-2 border-black"
                >
                    Cancel
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <h1 className="hidden md:block text-lg font-semibold mb-4">Settings</h1>
            <div className="flex p-3 ml-12 lg:flex-row sm:flex-col">
                {renderSidebar()}
                <div className="lg:w-2/3 sm:w-full bg-white shadow-lg rounded-lg p-8 mx-auto my-5">
                    {view === "account" && renderAccountView()}
                    {view === "password" && renderPasswordView()}
                    {view === "billing" && userRole === "TUTOR" && renderBillingView()}
                    {error && <div className="text-red-500 mt-4">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default Settings;
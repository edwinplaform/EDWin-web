import React from "react";
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

    let role = "STUDENT";

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            <h1 className="hidden md:block text-lg font-semibold mb-4">Settings</h1>
            {role === "TUTOR" && (
                <div>HI {role}</div>
            )}
            {role === "STUDENT" && (
                <div>HI {role}</div>
            )}
        </div>
    )
}

export default Settings;
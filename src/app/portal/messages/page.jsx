"use client"

import Sidebar from "@/components/chat/Sidebar";
import Chat from "@/components/chat/Chat";
import {useUser} from "@clerk/nextjs";
// import {currentUser} from "@clerk/nextjs/server";
import { doc,setDoc } from "firebase/firestore"
import {db} from "../../../../firebase";
import {useEffect} from "react";

const MessagesPage = () => {

    // const saveUserData = async () => {
    //     const user = currentUser();
    //     if (user) {
    //         await setDoc(doc(db,'users',(await user).id), {
    //             id: (await user).id,
    //             username: (await user).firstName + " " + (await user).lastName,
    //             email : (await user).emailAddresses,
    //         });
    //     }
    // };

    const {user} = useUser();
    useEffect(() => {
        console.log(user);
    }, []);

    return(
        <div className="h-screen flex items-center justify-center">
            <div className="flex w-5/6 h-5/6 rounded-lg shadow-lg overflow-hidden">
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}

export default MessagesPage;
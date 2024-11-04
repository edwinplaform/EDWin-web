"use client"

import Image from "next/image";
import {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../../firebase";

const Chats = () => {

    const [chats, setChats] = useState([]);
    const {user} = useUser();
    const userId = user?.id;

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", userId), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        userId && getChats();
     }, [userId]);

    console.log(chats);

    return (
        <div className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
            <Image src="/avatar.png" alt="" height={32} width={32} className="rounded-full" />
            <div className="px-4 flex flex-col">
                <h2 className="text-[14px] font-medium">Amal</h2>
                <span className="text-xs font-light">Hello Kamal oya kawada ?</span>
            </div>
        </div>
    )
}

export default Chats;
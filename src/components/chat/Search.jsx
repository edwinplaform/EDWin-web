"use client"

import Image from "next/image";
import {useState} from "react";
import {collection, query, where, getDocs, doc, setDoc, getDoc, updateDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../../../firebase";
import {useUser} from "@clerk/nextjs";

const Search = () => {

    const [name, setName] = useState("");
    const [foundUser, setFoundUser] = useState(null);
    const [err, setErr] = useState(false);

    const {user} = useUser();

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("username", "==", name)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setFoundUser(doc.data());
            });
        } catch (err) {
            setErr(err);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        const combinedId =
            user.id > foundUser.id
                ? user.id + foundUser.id
                : foundUser.id + user.id;
        try {
            const res = await getDoc(doc(db,"chats",combinedId));

            if (!res.exists()){
                //create a chat in chats collection
                await setDoc(doc(db,"chats",combinedId),{messages:[]});

                //create user chats
                await updateDoc(doc(db,"userChats",user?.id),{
                    [combinedId + ".userInfo"]:{
                        id:foundUser?.id,
                        displayName: foundUser?.username,
                        // photoURL:foundUser.imageUrl;
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

                await updateDoc(doc(db,"userChats",foundUser?.id),{
                    [combinedId + ".userInfo"]:{
                        id:user?.id,
                        displayName: user?.firstName,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

            }

        } catch (err){
            console.log("----------------err for search: ",err)
        }

        setName("");
        setFoundUser(null);
    }


    return (
        <div className="p-4">
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-700 px-2">
                <Image src="/search.png" alt="" width={14} height={14}/>
                <input type="text" placeholder="Search..." onKeyDown={handleKey} onChange={e => setName(e.target.value)}
                       value={name} className="w-[200px] p-2 bg-transparent outline-none"/>
            </div>
            {err && <span>User not found</span>}
            {foundUser && (
                <div className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-lg mt-4" onClick={handleSelect}>
                    <Image src="/avatar.png" alt="" height={32} width={32} className="rounded-full"/>
                    <div className="px-4 flex flex-col">
                        <h2 className="text-[14px] font-medium">{foundUser.username}</h2>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
// import {auth, currentUser} from "@clerk/nextjs/server";
import {doc, setDoc, getDoc} from "firebase/firestore";
import {db} from "../../firebase";

// export const CurrentRole = () => {
//     const {sessionClaims} = auth();
//
//     return sessionClaims.public_metadata?.role;
// };


export const saveUserData = async (user) => {
    try {
        if (user) {
            await setDoc(doc(db,'users',user.id), {
                id: user.id,
                username: user.firstName + " " + user.lastName,
                email : user.emailAddresses[0].emailAddress,
            });

            await setDoc(doc(db,"userChats",user.id),{});

        }
    } catch (err){
        console.log("--------------err",err)
    }

};

export const GetUser = async (userId) => {
    try {
        const userDoc = await getDoc(doc(db,"users",userId));
        return userDoc.exists() ? userDoc.data() : console.log("----------cannot find user");
    } catch (err){
        console.log("----------err",err);
    }
};
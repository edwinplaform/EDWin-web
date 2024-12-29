"use client"

import Banner from "@/components/Banner";
import Link from "next/link";
import {useAuth, useUser} from "@clerk/nextjs";
import {redirect, useRouter} from "next/navigation";
import {useEffect} from "react";
import {isOnboarding, role, saveUserData} from "@/util/Role";
import Stats from "@/components/Stats";
import WhyEDWin from "@/components/WhyEdwin";

export default function Home() {

    const {user, isSignedIn} = useUser();

    useEffect(() => {
        if (isSignedIn) {
            if (role(user) === "TUTOR" && !isOnboarding(user)) {
                redirect("/tutor/onboarding");
            } else if (role(user) === "STUDENT" && !isOnboarding(user)) {
                redirect("/student/onboarding");
            } else if (role(user) === "ADMIN") {
                redirect("/portal/tutors");
            } else {
                redirect("/portal/tutors")
            }
            // redirect("");
        }

        saveUserData(user).then(r => console.log("added to firestore!"));

    }, [isSignedIn, user]);


    return (
        <div>
            <Banner/>
            <div className="items-center justify-center flex flex-col my-5 h-32">
                <h1 className="font-extrabold text-4xl text-blue-900">Online Tutoring With Real Teachers</h1>
                <p className="font-light text-2xl text-black justify-center">Instant one-to-one tutoring - all
                    subjects, anytime, anywhere</p>
            </div>
            <Stats/>
            <WhyEDWin/>
            <div className="p-14 my-6 items-center justify-center flex">
                <h2 className="relative text-3xl sm:text-7xl text-black font-semibold">Lessons {"you'll"} love.
                    Guaranteed.</h2>
            </div>
        </div>
    );
}


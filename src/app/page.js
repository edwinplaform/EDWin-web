"use client"

import Banner from "@/components/Banner";
import Link from "next/link";
import {redirect, useRouter} from "next/navigation";
import {useEffect} from "react";
import Stats from "@/components/Stats";
import WhyEDWin from "@/components/WhyEdwin";
import {getCurrentUser} from "@/util/auth";
import ReviewSlider from "@/components/ReviewSlider";

export default function Home() {

    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const user = await getCurrentUser();
            if (user){
                if (user.role === "TUTOR" && !user.isOnboarding){
                    router.push("/tutor/onboarding");
                } else if (user.role === "STUDENT" && !user.isOnboarding){
                    router.push("/student/onboarding");
                } else if (user.role === "ADMIN"){
                    router.push("/portal/tutors");
                }
            }
        };
        checkUser();
    },[router]);


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
            <ReviewSlider/>
            <div className="p-14 my-6 items-center justify-center flex">
                <h2 className="relative text-3xl sm:text-7xl text-black font-semibold">Lessons {"you'll"} love.
                    Guaranteed.</h2>
            </div>
        </div>
    );
}


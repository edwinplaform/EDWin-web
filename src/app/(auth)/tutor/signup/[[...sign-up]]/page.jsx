"use client"

import Signup from "@/components/Signup";
import {useUser} from "@clerk/nextjs";
import {useEffect} from "react";

const SignUpPage = () => {

    return (
        <div>
            <Signup href="/login" role="teacher"/>
        </div>
    );
};

export default SignUpPage;
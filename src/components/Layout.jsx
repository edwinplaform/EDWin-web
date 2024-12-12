"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@clerk/nextjs";

const Layout = ({ children }) => {
    const { isSignedIn, user } = useUser();

    return (
        <>
            {!isSignedIn && <Navbar />}
            {children}
            {!isSignedIn && <Footer />}
        </>
    );
};

export default Layout;

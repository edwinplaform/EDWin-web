import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {currentUser} from "@clerk/nextjs/server";

const Layout = async ({ children }) => {
    const user = await currentUser();

    return (
        <>
            {!user &&
            <Navbar/> }
            {children}
            {!user &&
            <Footer/> }
        </>
    )
}

export default Layout;
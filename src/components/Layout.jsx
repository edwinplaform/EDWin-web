import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = async ({ children }) => {
    return (
        <>
            <Navbar/>
            {children}
            <Footer/>
        </>
    )
}

export default Layout;
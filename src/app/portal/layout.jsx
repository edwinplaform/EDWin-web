import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Nav from "@/components/Nav";

export default function PortalLayout ({children}) {
    return (
        <div className="h-screen flex">
            {/* LEFT */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
                <Link
                    href="/"
                    className="flex items-center justify-center lg:justify-start gap-2">
                    <h1 className="hidden lg:block font-bold text-4xl text-lightBlack">EDWin</h1>
                </Link>
                <Menu/>
            </div>
            {/* RIGHT */}
            <div className="w-[86%] md:w-[92] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
                <Nav/>
                {children}
            </div>
        </div>
    );
}
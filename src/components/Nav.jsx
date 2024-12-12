import Link from "next/link";
import {UserButton} from "@clerk/nextjs";

const Navbar = () => {
    return (
        <div className="bg-cusPurple flex items-center justify-between p-4">
            {/*/!* SEARCH BAR *!/*/}
            {/*<div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">*/}
            {/*    <Image src="/search.png" alt="" width={14} height={14} />*/}
            {/*    <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none"/>*/}
            {/*</div>*/}
            {/* ICONS AND USER */}
            <div className="flex items-center gap-6 justify-end w-full">
                <div className="px-8 flex items-center justify-center">
                    <Link href="/tutors">
                        <text
                            className="text-[15px] cursor-pointer text-black transition-all hover:font-bold flex items-center justify-center font-[400]">
                            Search for tutors
                        </text>
                    </Link>
                </div>
                <div className="px-8 flex items-center justify-center">
                    <Link href="/portal/messages">
                        <text
                            className="text-[15px] cursor-pointer text-black transition-all hover:font-bold flex items-center justify-center font-[400]">
                            My Portal
                        </text>
                    </Link>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs leading-3 font-medium">Amal Perera</span>
                    <span className="text-[10px] text-gray-500 text-right">Admin</span>
                </div>
                <UserButton/>
            </div>
        </div>
    )
}

export default Navbar;
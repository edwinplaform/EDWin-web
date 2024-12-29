import Link from "next/link";
import Button from "@/components/Button";
import {NAV_LINKS} from "@/constants";
import Image from "next/image";
import {useUser} from "@clerk/nextjs";

const Navbar = () => {

    return (
    <nav className="flex items-center justify-between mx-auto max-w-[1440px] relative z-30 py-4">
        <Link href="/">
            <div className="text-4xl font-bold text-lightBlack">EDWin</div>
        </Link>

        <div className="hidden h-full gap-16 lg:flex">
            {NAV_LINKS.map((link) => (
                <Link
                    href={link.href}
                    key={link.key}
                    className="relative text-black cursor-pointer pb-1.5 transition-all 
                    ease-in-out hover:text-blue-500 flex items-center justify-center text-[18px] font-[400] 
                    before:transition-[width] before:ease-in-out before:duration-700 before:absolute 
                    before:bg-blue-500 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] 
                    before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 
                    after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 
                    hover:after:w-[50%] after:bottom-0 after:right-[50%] hover:font-bold "
                >
                {link.label}
                </Link>
            ))}

        </div>

        <div className="lg:flex items-center hidden gap-4">
            <Link href="/login">
                <Button
                    type="button"
                    title="Login"
                    variant="bg-white px-8 py-2 text-black transition-all"
                />
            </Link>

            <Link href="/signup">
                <Button
                    type="button"
                    title="Register"
                    variant="inline-flex justify-center whitespace-nowrap rounded-lg px-8 py-2 
                    text-black bg-gradient-to-r from-cyan-400 to-cyan-600  focus:outline-none focus:ring 
                    focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring 
                    focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] 
                    before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,
                    transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                />
            </Link>
        </div>

        <Image
            src="/menu.svg"
            alt="menu"
            height={32}
            width={32}
            className="inline-block cursor-pointer lg:hidden"
        />

    </nav>

    );
};

export default Navbar;
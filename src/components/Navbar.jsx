import Link from "next/link";
import Button from "@/components/Button";
import {NAV_LINKS} from "@/constants";
import Image from "next/image";

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
                        className="text-black cursor-pointer pb-1.5 transition-all hover:font-bold flex items-center justify-center text-[15px font-[400]]">
                        {link.label}
                    </Link>
                ))}
            </div>

            <div className="lg:flexCenter hidden gap-4">
                <Button
                    type="button"
                    title="Login"
                    variant="bg-white px-8 py-2 text-black transition-all"
                />

                <Button
                    type="button"
                    title="Register"
                    variant="bg-black px-8 py-2 text-white transition-all"
                />
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
"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/constants";

const Nav = () => {
    const { data: session } = useSession();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        setIsProfileMenuOpen(false);
        signOut({ callbackUrl: "/" });
    };

    return (
        <nav className={`relative w-full z-30 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-[28px] font-bold text-blue-900">
                            EDWin
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {!session?.user &&
                            NAV_LINKS.map((link) => (
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                                >
                                    {link.label}
                                </Link>
                            ))
                        }

                        {/* Conditional links based on user role */}
                        {session?.user?.role === "TUTOR" && (
                            <Link
                                href="/portal/messages"
                                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                            >
                                My Portal
                            </Link>
                        )}

                        {session?.user?.role === "STUDENT" && (
                            <>
                                <Link
                                    href="/portal/messages"
                                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                                >
                                    My Portal
                                </Link>
                                <Link
                                    href="/tutors"
                                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                                >
                                    Find Tutors
                                </Link>
                            </>
                        )}

                        {session?.user?.role === "ADMIN" && (
                            <Link
                                href="/portal/tutors"
                                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                            >
                                Admin Portal
                            </Link>
                        )}

                        {/* Authentication buttons */}
                        {!session?.user ? (
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium border border-transparent hover:border-gray-200 transition duration-150"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setIsProfileMenuOpen(!isProfileMenuOpen);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 hidden sm:block">
                      {session.user.name}
                    </span>
                                        <Image
                                            className="h-8 w-8 rounded-full object-cover"
                                            src={session.user.image || "/avatar.png"}
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                </button>
                                {isProfileMenuOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
                                    >
                                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                            <p className="font-medium">{session.user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                        </div>
                                        <Link
                                            href="/portal/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        >
                                            Your Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        {session?.user && (
                            <div className="flex items-center mr-4">
                                <button
                                    onClick={() => {
                                        setIsProfileMenuOpen(!isProfileMenuOpen);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <Image
                                        className="h-8 w-8 rounded-full object-cover"
                                        src={session.user.image || "/avatar.png"}
                                        alt="Profile"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                                {isProfileMenuOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 top-16 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
                                    >
                                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                            <p className="font-medium">{session.user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                        </div>
                                        <Link
                                            href="/portal/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        >
                                            Your Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                                setIsProfileMenuOpen(false);
                            }}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg pb-4 px-4">
                    <div className="pt-2 pb-3 space-y-1">
                        {!session?.user &&
                            NAV_LINKS.map((link) => (
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))
                        }

                        {/* Conditional links based on user role */}
                        {session?.user?.role === "TUTOR" && (
                            <Link
                                href="/portal/messages"
                                className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                My Portal
                            </Link>
                        )}

                        {session?.user?.role === "STUDENT" && (
                            <>
                                <Link
                                    href="/portal/messages"
                                    className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    My Portal
                                </Link>
                                <Link
                                    href="/tutors"
                                    className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Find Tutors
                                </Link>
                            </>
                        )}

                        {session?.user?.role === "ADMIN" && (
                            <Link
                                href="/portal/tutors"
                                className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Admin Portal
                            </Link>
                        )}

                        {/* Authentication buttons for mobile */}
                        {!session?.user && (
                            <div className="mt-4 space-y-2 pt-2 border-t border-gray-200">
                                <Link
                                    href="/login"
                                    className="block w-full text-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium border border-gray-300 hover:border-blue-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;
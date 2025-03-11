"use client"

import {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const Login = ({href}) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const router = useRouter();
        const {data: session} = useSession();

        useEffect(() => {
            if (session) {
                redirectBasedOnRole(session.user.role);
            }
        }, [session]);

        const redirectBasedOnRole = (role) => {
            if (role === "TUTOR") {
                router.push('/portal/tutors/classes');
            } else if (role === 'STUDENT') {
                router.push('/portal/students/classes');
            } else if (role === 'ADMIN') {
                router.push('/portal/tutors');
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true);
            setError("");

            try {
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (result.error) {
                    setError(result.error);
                } else {
                    router.refresh();
                }
            } catch (err) {
                setError("An unexpected error occurred. Please try again.");
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        const handleOAuthSignIn = (provider) => {
            signIn(provider, {callbackUrl: "/"});
        };

        return (
            <div
                className="h-screen flex items-center justify-center bg-[url('/EDWinBG.png')] bg-cover bg-center bg-no-repeat">
                <div className="bg-white w-1/3 rounded-2xl py-10 px-8 shadow-2xl border space-y-6">
                    <header className="flex justify-between">
                        <p className="mt-2 text-4xl text-gray-700 font-bold">Login</p>
                        <h1 className="mt-2 font-bold text-lg">EDWin</h1>
                    </header>

                    {error && <div className="text-sm text-red-400">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                                required
                                type="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Password</label>
                            <input
                                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                                required
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white my-1 rounded-md text-sm p-[10px]"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="flex items-center justify-center my-4">
                        <span className="border-b border-gray-300 w-full"></span>
                        <span className="px-2 text-gray-500 font-semibold">or</span>
                        <span className="border-b border-gray-300 w-full"></span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        <button
                            onClick={() => handleOAuthSignIn("google")}
                            className="flex items-center gap-x-3 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md"
                        >
                            <svg className="size-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                            </svg>
                            Google
                        </button>
                    </div>

                    <p className="text-center text-sm text-zinc-500">
                        Don&apos;t have an account?{" "}
                        <a
                            href={href}
                            className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                        >
                            Register
                        </a>
                    </p>
                </div>
            </div>
        );
    }
;

export default Login;
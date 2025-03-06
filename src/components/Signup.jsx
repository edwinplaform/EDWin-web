"use client"

import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import axiosInstance from "@/util/axiosInstance";

const SignUp = ({href, role}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState("start");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const res = await axiosInstance.post("/auth/register", {
                email,
                password,
                role,
            });
            console.log(email, password,role);

            if (res.status === 201) {
                setStep("verification");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerification = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await axiosInstance.post("/auth/verify", {
                email,
                code: verificationCode,
            });

            if (res.status === 200) {
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (result.error) {
                    setError(result.error);
                } else {
                    router.push("/");
                    router.refresh();
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "Verification failed. Please try again.");
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
            {step === "start" ? (
                <div className="w-1/3 space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:px-8">
                    <header className="flex justify-between">
                        <h1 className="mt-2 text-4xl text-gray-700 font-bold">Sign Up</h1>
                        <h1 className="mt-2 font-bold text-lg">EDWin</h1>
                    </header>
                    {error && <div className="block text-sm text-red-400">{error}</div>}

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-950">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-950">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-950">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="Re-Enter the Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
                        >
                            {isLoading ? "Signing Up..." : "Sign Up"}
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
                        <button
                            onClick={() => handleOAuthSignIn("facebook")}
                            className="flex items-center gap-x-3 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md"
                        >
                            <svg className="size-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                        </button>
                    </div>

                    <p className="text-center text-sm text-zinc-500">
                        Already have an account?{" "}
                        <a
                            href={href}
                            className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                        >
                            Log in
                        </a>
                    </p>
                </div>
            ) : (
                <div
                    className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8">
                    <header className="text-center">
                        <h1 className="font-bold text-2xl">EDWin</h1>
                        <h1 className="mt-2 text-md font-medium text-gray-700">
                            Verify email code
                        </h1>
                    </header>
                    {error && <div className="block text-sm text-red-400">{error}</div>}

                    <form onSubmit={handleVerification}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-950">
                                Email code
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                required
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4 rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
                        >
                            {isLoading ? "Verifying..." : "Verify"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-zinc-500">
                        Already have an account?{" "}
                        <a
                            href={href}
                            className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default SignUp;
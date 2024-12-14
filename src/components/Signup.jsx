'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import {useUser} from "@clerk/nextjs";
import {useEffect} from "react";
import {useUpgradeRole} from "@/hooks/useUsers";
import {redirect} from "next/navigation";

const Signup = ({href, role}) => {

    const {user, isSignedIn} = useUser();
    const upgradeRoleMutation = useUpgradeRole();

    // useEffect(() => {
    //     if (isSignedIn && role) {
    //         const upgradeRole = {
    //             method: "POST",
    //             headers: {'content-type': 'application/json'},
    //             body: JSON.stringify({userId: user.id, role: role}),
    //         };
    //
    //         fetch('http://localhost:8081/api/v1/users/upgradeRole', upgradeRole)
    //             .then(res => res.json())
    //             .then(data => console.log("Register successfully!"));
    //
    //     } else {
    //         console.log("please log in");
    //     }
    // }, [isSignedIn, role, user?.id]);

    // useEffect(() => {
    //     const handleSuccess = () => {
    //         if (isSignedIn && user?.id && role) {
    //             console.log('Attempting role upgrade: ', {
    //                 userId: user.id,
    //                 role: role,
    //                 isOnboarding: false
    //             });
    //             upgradeRoleMutation.mutate({
    //                     userId: user.id,
    //                     role: role,
    //                     isOnboarding: false
    //                 },
    //             );
    //         }
    //     };
    //
    //     SignUp.Root.setProps({
    //         onSuccess: handleSuccess,
    //     })
    //
    //     return () => clearTimeout(timer);
    // }, [isSignedIn, user?.id, role, upgradeRoleMutation]);

    // const handleSignUpComplete = async (user) => {
    //     console.log("User signed up:", user);
    //
    //     if (user?.id && role) {
    //         console.log("Upgrading role:", {userId: user.id, role});
    //         await upgradeRoleMutation.mutate(
    //             {userId: user.id, role, isOnboarding: false},
    //             {
    //                 onSuccess: () => {
    //                     console.log("Role upgraded successfully!");
    //                     redirect(role === "TUTOR" ? "/tutor/onboarding" : "/student/onboarding");
    //                 },
    //                 onError: (error) => {
    //                     console.error("Error upgrading role:", error);
    //                 },
    //             }
    //         );
    //     }
    // };

    return (
        <div className="h-screen flex items-center justify-center bg-customLime">
            <SignUp.Root>
                <SignUp.Step
                    name="start"
                    className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
                >
                    <header className="text-center">
                        <h1 className="font-bold text-2xl">EDWin</h1>
                        <h1 className="mt-2 font-medium text-gray-700">
                            Create an account
                        </h1>
                    </header>
                    <Clerk.GlobalError className="block text-sm text-red-400"/>
                    <div className="grid grid-cols-2 gap-x-4">
                        <Clerk.Connection
                            name="google"
                            className="flex items-center gap-x-3 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md">
                            <Clerk.Icon className="size-4"/>
                            Google
                        </Clerk.Connection>
                        <Clerk.Connection
                            name="facebook"
                            className="flex items-center gap-x-3 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md">
                            <Clerk.Icon className="size-4"/>
                            Facebook
                        </Clerk.Connection>
                    </div>
                    <div className="space-y-4">
                        <Clerk.Field name="emailAddress" className="space-y-2">
                            <Clerk.Label className="text-sm font-medium text-zinc-950">Email</Clerk.Label>
                            <Clerk.Input
                                type="email"
                                required
                                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                            />
                            <Clerk.FieldError className="block text-sm text-red-400"/>
                        </Clerk.Field>
                        <Clerk.Field name="password" className="space-y-2">
                            <Clerk.Label className="text-sm font-medium text-zinc-950">Password</Clerk.Label>
                            <Clerk.Input
                                type="password"
                                required
                                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                            />
                            <Clerk.FieldError className="block text-sm text-red-400"/>
                        </Clerk.Field>
                    </div>
                    <SignUp.Action
                        submit
                        className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
                    >
                        Sign Up
                    </SignUp.Action>

                    <p className="text-center text-sm text-zinc-500">
                        Already have an account?{' '}
                        <a
                            href={href}
                            className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                        >
                            Sign in
                        </a>
                    </p>
                </SignUp.Step>
                <SignUp.Step
                    name="verifications"
                    className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
                >
                    <header className="text-center">
                        <h1 className="font-bold text-2xl">EDWin</h1>
                        <h1 className="mt-2 text-md font-medium text-gray-700">
                            Verify email code
                        </h1>
                    </header>
                    <Clerk.GlobalError className="block text-sm text-red-400"/>
                    <SignUp.Strategy
                        name="email_code"
                        onSuccess={() => {
                            if (user?.id && role) {
                                console.log('Attempting role upgrade:', {
                                    userId: user.id,
                                    role: role,
                                    isOnboarding: false
                                });

                                upgradeRoleMutation.mutate({
                                    userId: user.id,
                                    role: role,
                                    isOnboarding: false
                                });
                            }
                        }}
                    >
                        <Clerk.Field name="code" className="space-y-2">
                            <Clerk.Label className="text-sm font-medium text-zinc-950">Email code</Clerk.Label>
                            <Clerk.Input
                                type="otp"
                                required
                                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                            />
                            <Clerk.FieldError className="block text-sm text-red-400"/>
                        </Clerk.Field>
                        <SignUp.Action
                            submit
                            className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
                        >
                            Verify
                        </SignUp.Action>
                    </SignUp.Strategy>
                    <p className="text-center text-sm text-zinc-500">
                        Already have an account?{' '}
                        <a
                            href={href}
                            className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                        >
                            Sign in
                        </a>
                    </p>
                </SignUp.Step>
            </SignUp.Root>
        </div>
    )
}

export default Signup;
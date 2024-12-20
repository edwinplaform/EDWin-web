"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

const Login = ({ href }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-[url('/EDWinBG.png')] bg-cover bg-center bg-no-repeat">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white w-1/3 rounded-2xl py-10 px-8 shadow-2xl border space-y-6"
        >
          <header className="flex justify-between">
          <p className="mt-2 text-4xl text-gray-700 font-bold">
              Login
            </p>
            <h1 className="mt-2 font-bold text-lg">EDWin</h1>
          </header>
          <Clerk.GlobalError className=" text-sm text-red-400" />
          
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-sm font-medium">Email</Clerk.Label>
            <Clerk.Input
              className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              required
              type="email"
              placeholder="Enter your Email"
            />
            <Clerk.FieldError className="block text-sm text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-sm font-medium">Password</Clerk.Label>
            <Clerk.Input
              className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              required
              type="password"
              placeholder="Enter your password"
            />
            <Clerk.FieldError className="block text-sm text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="w-full bg-black text-white my-1 rounded-md text-sm p-[10px]"
          >
            Sign In
          </SignIn.Action>
          <div className="flex items-center justify-center my-4">
            <span className="border-b border-gray-300 w-full"></span>
            <span className="px-2 text-gray-500 font-semibold">or</span>
            <span className="border-b border-gray-300 w-full"></span>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <Clerk.Connection
              name="google"
              className="flex items-center gap-x-3 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md"
            >
              <Clerk.Icon className="size-4" />
              Google
            </Clerk.Connection>
            <Clerk.Connection
              name="facebook"
              className="flex items-center gap-x-3 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md"
            >
              <Clerk.Icon className="size-4" />
              Facebook
            </Clerk.Connection>
          </div>
          <p className="text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <a
              href={href}
              className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
            >
              Register
            </a>
          </p>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default Login;
import {getSession as getClientSession, useSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export const getSession = async () => {
    return await getClientSession();
};

export const getServerAuthSession = async (req) => {
    return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
    const session = await getSession();
    return session?.user || null;
}

export const getUserRole = async () => {
    const user = await getCurrentUser();
    return user?.role || null;
}

export const isOnboarding = async () => {
    const user = await getCurrentUser();
    return user?.isOnboarding || false;
}

export const isAuthenticated = async () => {
    const session = await getSession();
    return !!session;
}

export const useCurrentUser = () => {
    const {data: session} = useSession();
    return session?.user || null;
}
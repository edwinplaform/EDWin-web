import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axiosInstance from "@/util/axiosInstance";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                try {
                    const res = await axiosInstance.post("/auth/login", {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    if (res.data && res.data.user) {
                        return {
                            id: res.data.user.userId,
                            email: res.data.user.email,
                            name: `${res.data.user.firstName} ${res.data.user.lastName}`,
                            image: res.data.user.profilePhotoUrl,
                            role: res.data.user.role,
                            isOnboarding: res.data.user.isOnboarding,
                            accessToken: res.data.accessToken,
                        };
                    }
                    return null;
                } catch (error) {
                    throw new Error(error.response?.data?.message || "Authentication failed");
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        // eslint-disable-next-line no-unused-vars
        async jwt({token, user, account}) {
            if (account && user) {
                if (account.provider === "google") {
                    try {
                        const res = await axiosInstance.post("/auth/oauth", {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId || account.id,
                        });

                        if (res.data && res.data.user) {
                            return {
                                ...token,
                                id: res.data.user.userId,
                                accessToken: res.data.user.accessToken,
                                role: res.data.user.role,
                                isOnboarding: res.data.user.isOnboarding,
                                image: res.data.user.profilePhotoUrl,
                            };
                        }
                    } catch (err) {
                        console.error("OAuth error: ", err);
                    }
                }

                if (account.provider === "credentials") {
                    return {
                        ...token,
                        id: user.id,
                        accessToken: user.accessToken,
                        role: user.role,
                        isOnboarding: user.isOnboarding,
                        image: user.image || user.profilePhotoUrl,
                    };
                }
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.isOnboarding = token.isOnboarding;
                session.user.image = token.image;
                session.accessToken = token.accessToken;
            }
            return session;
        },
        async redirect({url, baseUrl}) {
            if (url.startsWith(baseUrl)) {
                return url;
            }
            return baseUrl;
        }
    },
    pages: {
        signIn: '/login',
        // error: '/error',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 0,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};

import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            if (!session.user) return session;
            const currentUser = await prisma.user.findUnique({
                where: {
                    email: session.user.email ?? "",
                },
            });
            if (currentUser) {
                session.user.name = currentUser.name;
                session.user.email = currentUser.email;
                session.user.image = currentUser.image;
                session.user.id = currentUser.id;
            }
            return session;
        },
        async signIn({ user }) {
            const currentUser = await prisma.user.findUnique({
                where: {
                    email: user.email ?? "",
                },
            });
            if (!currentUser) {
                await prisma.user.create({
                    data: {
                        name: user.name ?? "",
                        email: user.email ?? "",
                        image: user.image ?? "",
                    },
                });
            }
            console.log("ali");
            return true;
        },
    },
    secret: "DIT ME BAC KI",
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import NextAuth from "next-auth/next";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            SECRET: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            UPLOADTHING_SECRET: string;
            UPLOADTHING_APP_ID: string;
        }
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            email: string;
            image: string;
            id: string;
        };
    }
}

export {};

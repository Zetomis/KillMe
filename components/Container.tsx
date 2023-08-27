"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SessionProvider>{children}</SessionProvider>
        </>
    );
};

export default Container;

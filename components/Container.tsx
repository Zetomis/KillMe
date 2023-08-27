"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className="mt-20 container">
            <SessionProvider>
                <QueryClientProvider client={client}>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </SessionProvider>
        </div>
    );
};

export default Container;

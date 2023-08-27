"use client";

import NewestItemFeed from "@/components/NewestItemFeed";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

const RootApp = () => {
    return (
        <div className="flex flex-col gap-y-8">
            {/* Hero here */}
            <div className="py-32">
                <h1 className="text-3xl font-extrabold">So long story short</h1>
                <h2 className="text-2xl font-bold">i want to kms</h2>
                <h3>
                    Sign in if you also want to kys.{" "}
                    <button
                        onClick={() => signIn("google")}
                        className="text-slate-600"
                    >
                        Sign In.
                    </button>
                </h3>
            </div>
            <NewestItemFeed />
        </div>
    );
};

export default RootApp;

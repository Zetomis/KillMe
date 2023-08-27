"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    const { data: session, status } = useSession();

    return (
        <div className="bg-slate-800 text-slate-200 py-4 fixed top-0 inset-x-0 z-50">
            <div className="container flex items-center justify-between gap-x-6 h-10">
                <Link
                    href={"/"}
                    className="text-slate-50 font-extrabold text-xl hover:underline"
                >
                    KILLME
                </Link>
                <div className="flex-1">SearchBar</div>
                {status === "authenticated" ? (
                    <div className="flex items-center gap-x-4">
                        <Link
                            href={`/profile?id=${session.user.id}`}
                            className="flex items-center gap-x-2"
                        >
                            <h1 className="text-slate-100 font-semibold">
                                {session.user.name}
                            </h1>
                            <UserAvatar src={session.user.image} />
                        </Link>
                        <Link
                            href={"/cart"}
                            className="flex items-center gap-x-2 button ghost"
                        >
                            <h1>Cart</h1>
                            <FaShoppingCart />
                        </Link>
                        <button
                            className="button ghost"
                            onClick={() => signOut()}
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div>
                        <button
                            className="button ghost"
                            onClick={() => signIn("google")}
                        >
                            Sign In
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;

import Link from "next/link";
import { signIn } from "next-auth/react";

const UnAuth = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-y-2">
            <h1 className="font-bold text-2xl text-slate-800">
                Sign In to Continue
            </h1>
            <button className="button default" onClick={() => signIn("google")}>
                Sign In
            </button>
        </div>
    );
};

export default UnAuth;

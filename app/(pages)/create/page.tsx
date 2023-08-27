"use client";
import Loading from "@/components/Loading";
import UnAuth from "@/components/UnAuth";
import { useSession } from "next-auth/react";

const CreatePage = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "unauthenticated") {
        return <UnAuth />;
    }

    return <div></div>;
};

export default CreatePage;

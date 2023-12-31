"use client";

import Loading from "@/components/Loading";
import { getUserById, getUserItems } from "@/utils/actions/user.actions";
import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserItemFeed from "@/components/UserItemFeed";

const ProfilePage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { data: session, status } = useSession();

    if (!id) {
        return notFound();
    }

    const userQuery = useQuery({
        queryKey: ["user", { id }],
        queryFn: () => getUserById(id),
    });

    if (userQuery.isLoading || status === "loading") {
        return <Loading />;
    }

    if (userQuery.isError || !userQuery.data) {
        return notFound();
    }

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden relative border border-slate-500">
                        <Image
                            src={userQuery.data.image}
                            alt=""
                            quality={100}
                            width={128}
                            height={128}
                        />
                    </div>
                    <h1 className="text-2xl font-bold">
                        {userQuery.data.name}
                    </h1>
                </div>
                {status === "authenticated" &&
                    session.user.id === userQuery.data.id && (
                        <Link href={"/create"} className="button default">
                            Create new Item
                        </Link>
                    )}
            </div>
            <div>
                <h1 className="mb-4 text-2xl font-bold">User's Item:</h1>
                <UserItemFeed userId={id} />
            </div>
        </div>
    );
};

export default ProfilePage;

"use client";

import AddToCartButton from "@/components/AddToCartButton";
import LikeTool from "@/components/LikeTool";
import Loading from "@/components/Loading";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import { getItemById } from "@/utils/actions/item.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import ReactMarkDown from "react-markdown";

const ItemPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { data: session, status } = useSession();

    if (!id) {
        return notFound();
    }

    const itemQuery = useQuery({
        queryKey: ["item", { id }],
        queryFn: () => getItemById(id),
    });

    if (itemQuery.isLoading || status === "loading") {
        return <Loading />;
    }

    if (itemQuery.isError) {
        return <SomethingWentWrong />;
    }

    if (!itemQuery.data) {
        return notFound();
    }

    return (
        <div className="grid grid-cols-2 gap-x-8">
            <div className="w-full aspect-square relative rounded overflow-hidden">
                <Image
                    src={itemQuery.data.image}
                    alt=""
                    fill
                    objectFit="cover"
                />
            </div>
            <div className="flex flex-col gap-y-2">
                <h1 className="font-bold text-3xl mb-2">
                    {itemQuery.data.name}
                </h1>
                <h2 className="font-semibold text-lg">
                    ${itemQuery.data.price}
                </h2>
                <h3 className="font-medium text-base">
                    Created by{" "}
                    <Link
                        href={`/profile?id=${itemQuery.data.seller.id}`}
                        className="text-slate-600 underline"
                    >
                        {itemQuery.data.seller.name}
                    </Link>
                </h3>
                {status === "authenticated" && (
                    <LikeTool
                        itemId={itemQuery.data.id}
                        likes={itemQuery.data.likes}
                        session={session}
                    />
                )}
                <AddToCartButton itemId={itemQuery.data.id} />
                <ReactMarkDown className="prose mt-8">
                    {itemQuery.data.description}
                </ReactMarkDown>
            </div>
        </div>
    );
};

export default ItemPage;

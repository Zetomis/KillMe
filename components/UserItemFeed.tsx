"use client";

import { getUserItems } from "@/utils/actions/user.actions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "./Loading";
import { notFound } from "next/navigation";
import SomethingWentWrong from "./SomethingWentWrong";
import ItemCard from "./ItemCard";
import ItemDisplay from "./ItemDisplay";
import { getNewestItem } from "@/utils/actions/item.actions";
import PaginationTool from "./PaginationTool";

const UserItemFeed = ({ userId }: { userId: string }) => {
    const [pageNumber, setPageNumber] = useState(1);

    const userItemsQuery = useQuery({
        queryKey: ["item", { sellerId: userId, pageNumber }],
        queryFn: () => getUserItems(userId, pageNumber),
        keepPreviousData: true,
    });

    if (userItemsQuery.isLoading) {
        return <Loading />;
    }

    if (userItemsQuery.isError || !userItemsQuery.data) {
        return <SomethingWentWrong />;
    }

    return (
        <div className="flex flex-col gap-y-4">
            <ItemDisplay items={userItemsQuery.data.items} />
            <PaginationTool
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                amount={userItemsQuery.data.amount}
            />
        </div>
    );
};

export default UserItemFeed;

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

const UserItemFeed = ({ userId }: { userId: string }) => {
    const [pageNumber, setPageNumber] = useState(1);

    const userItemsQuery = useQuery({
        queryKey: ["item", { sellerId: userId }],
        queryFn: () => getUserItems(userId, pageNumber),
    });

    if (userItemsQuery.isLoading) {
        return <Loading />;
    }

    if (userItemsQuery.isError || !userItemsQuery.data) {
        return <SomethingWentWrong />;
    }

    return (
        <div>
            <ItemDisplay items={userItemsQuery.data.items} />
        </div>
    );
};

export default UserItemFeed;

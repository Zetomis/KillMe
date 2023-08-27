"use client";

import { getUserItems } from "@/utils/actions/user.actions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "./Loading";
import SomethingWentWrong from "./SomethingWentWrong";
import ItemDisplay from "./ItemDisplay";
import PaginationTool from "./PaginationTool";
import { getNewestItem } from "@/utils/actions/item.actions";

const NewestItemFeed = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const itemsQuery = useQuery({
        queryKey: ["item", { pageNumber }],
        queryFn: () => getNewestItem(pageNumber),
        keepPreviousData: true,
    });

    if (itemsQuery.isLoading) {
        return <Loading />;
    }

    if (itemsQuery.isError || !itemsQuery.data) {
        return <SomethingWentWrong />;
    }

    return (
        <div className="flex flex-col gap-y-4">
            <ItemDisplay items={itemsQuery.data.items} />
            <PaginationTool
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                amount={itemsQuery.data.amount}
            />
        </div>
    );
};

export default NewestItemFeed;

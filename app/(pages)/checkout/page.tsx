"use client";

import Loading from "@/components/Loading";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import UnAuth from "@/components/UnAuth";
import { getUserCartItem } from "@/utils/actions/cart.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";

const CheckOutPage = () => {
    const { data: session, status } = useSession();

    const userCartItemsQuery = useQuery({
        queryKey: ["userCartItems", { userId: session?.user.id }],
        queryFn: () => getUserCartItem(session?.user.id ?? ""),
    });

    if (status === "loading" || userCartItemsQuery.isLoading) {
        return <Loading />;
    }

    if (status === "unauthenticated") {
        return <UnAuth />;
    }

    if (!session || userCartItemsQuery.isError || !userCartItemsQuery.data) {
        return <SomethingWentWrong />;
    }

    console.log(userCartItemsQuery.data);

    return (
        <div className="px-6 py-4 border border-slate-400 rounded flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
                {userCartItemsQuery.data.map((item) => (
                    <div className="px-4 py-2 border border-slate-200 flex gap-x-3 items-center">
                        <div className="w-12 h-12 rounded overflow-hidden relative">
                            <Image
                                src={item.item.image}
                                alt=""
                                fill
                                objectFit="cover"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2 justify-center flex-1">
                            <h1 className="font-semibold text-base truncate">
                                {item.item.name}
                            </h1>
                            <h2 className="font-medium text-sm">
                                ${item.item.price}
                            </h2>
                        </div>
                        <h1 className="text-slate-800 font-semibold">
                            Amount:{" "}
                            <span className="text-slate-600 font-medium">
                                {item.amount}
                            </span>
                        </h1>
                    </div>
                ))}
            </div>
            <h1 className="font-bold text-2xl">
                Total Cost: $
                {userCartItemsQuery.data.reduce((pre, cur) => {
                    return pre + cur.item.price * cur.amount;
                }, 0)}
            </h1>
            <h2 className="font-semibold text-xl">
                Estimated Shipping Cost: 69696969 Bobux
            </h2>
            <button className="button default w-full block mt-2">
                Check Out
            </button>
        </div>
    );
};

export default CheckOutPage;

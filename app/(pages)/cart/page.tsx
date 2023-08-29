"use client";

import CartItemCard from "@/components/CartItemCard";
import Loading from "@/components/Loading";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import UnAuth from "@/components/UnAuth";
import { getUserCartItem } from "@/utils/actions/cart.actions";
import { CartItem } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartPage = () => {
    const { data: session, status } = useSession();
    const [fakeUserCart, setFakeUserCart] = useState<CartItem[]>([]);

    const userCartItemsQuery = useQuery({
        queryKey: ["userCartItems", { userId: session?.user.id }],
        queryFn: () => getUserCartItem(session?.user.id ?? ""),
    });

    useEffect(() => {
        if (userCartItemsQuery.data) {
            setFakeUserCart(userCartItemsQuery.data);
        } else {
            setFakeUserCart([]);
        }
    }, [userCartItemsQuery.isSuccess]);

    if (status === "loading" || userCartItemsQuery.isLoading) {
        return <Loading />;
    }

    if (status === "unauthenticated") {
        return <UnAuth />;
    }

    if (!session || userCartItemsQuery.isError || !userCartItemsQuery.data) {
        return <SomethingWentWrong />;
    }

    return (
        <div className="flex flex-col gap-y-4">
            {fakeUserCart.map((item) => (
                <CartItemCard item={item} setFakeUserCart={setFakeUserCart} />
            ))}
            <Link
                href={"/checkout"}
                className="button default mt-2 text-center block"
            >
                Check Out
            </Link>
        </div>
    );
};

export default CartPage;

"use client";

import { getItemById } from "@/utils/actions/item.actions";
import { CartItem } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import Image from "next/image";
import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { changeAmount, removeUserCartItem } from "@/utils/actions/cart.actions";

const CartItemCard = ({
    item,
    setFakeUserCart,
}: {
    item: CartItem;
    setFakeUserCart: Dispatch<SetStateAction<CartItem[]>>;
}) => {
    const [amountInput, setAmountInput] = useState(item.amount);
    const getItemQuery = useQuery({
        queryKey: ["item", { id: item.itemId }],
        queryFn: () => getItemById(item.itemId),
    });
    const removeCartItem = useMutation({
        mutationKey: ["removeUserCartItem", { id: item.id }],
        mutationFn: () => removeUserCartItem(item.id),
        onSuccess: () => {
            setFakeUserCart((fakeUserCart) => {
                return fakeUserCart.filter((i) => i.id !== item.id);
            });
        },
    });
    const changeAmountCartItemMutation = useMutation({
        mutationKey: ["changeAmountCartItem", { id: item.id }],
        mutationFn: () => changeAmount(amountInput, item.id),
    });

    useEffect(() => {
        if (!amountInput) {
            setAmountInput(item.amount);
        }
    }, [amountInput]);

    useEffect(() => {
        changeAmountCartItemMutation.mutate();
    }, [amountInput]);

    if (getItemQuery.isLoading) {
        return <Loading />;
    }

    if (getItemQuery.isError || !getItemQuery.data) {
        return null;
    }

    const handleAmountSubmit = (event: FormEvent) => {
        event.preventDefault();
    };
    return (
        <div className="py-4 px-6 border border-slate-400 rounded flex items-center gap-x-4">
            <div className="w-20 h-20 relative rounded overflow-hidden">
                <Image
                    src={getItemQuery.data.image}
                    alt=""
                    fill
                    objectFit="cover"
                />
            </div>
            <div className="flex flex-col gap-y-2 flex-1">
                <h1 className="font-bold text-xl truncate">
                    {getItemQuery.data.name}
                </h1>
                <h2 className="font-semibold text-base">
                    ${getItemQuery.data.price}
                </h2>
            </div>
            <div className="flex gap-x-4 items-center">
                <form onSubmit={(event) => handleAmountSubmit(event)}>
                    <input
                        type="number"
                        className="input !mb-0"
                        defaultValue={item.amount}
                        value={amountInput}
                        onChange={(event) => {
                            setAmountInput(Number(event.target.value));
                        }}
                    />
                </form>
                <button
                    className="button default"
                    onClick={() => {
                        removeCartItem.mutate();
                    }}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItemCard;

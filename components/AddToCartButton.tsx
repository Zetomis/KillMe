"use client";

import { addItemToCart } from "@/utils/actions/item.actions";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

const AddToCartButton = ({
    className,
    itemId,
}: {
    className?: string;
    itemId: string;
}) => {
    const { data: session, status } = useSession();

    if (
        status === "loading" ||
        status === "unauthenticated" ||
        !session?.user
    ) {
        return null;
    }

    const addToCartMutation = useMutation({
        mutationKey: ["cartItem"],
        mutationFn: () => addItemToCart(session.user.id, itemId),
    });

    return (
        <button
            className={`button default ${className}`}
            onClick={() => addToCartMutation.mutate()}
            disabled={addToCartMutation.isLoading}
        >
            Add to Cart
        </button>
    );
};

export default AddToCartButton;

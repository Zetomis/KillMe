"use client";

import { removeUserCartItem } from "@/utils/actions/cart.actions";
import {
    handleUserDislike,
    handleUserLike,
} from "@/utils/actions/item.actions";
import { Like } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const LikeTool = ({
    itemId,
    likes,
    session,
}: {
    itemId: string;
    likes: Like[];
    session: Session;
}) => {
    const [isUserLiked, setIsUserLiked] = useState(false);
    const [fakeLikesCount, setFakeLikesCount] = useState(likes.length);

    const likeMutation = useMutation({
        mutationKey: ["like", { userId: session.user.id, itemId }],
        mutationFn: () => {
            setIsUserLiked(true);
            setFakeLikesCount((fakeLikesCount) => fakeLikesCount + 1);

            return handleUserLike(session.user.id, itemId);
        },
    });

    const dislikeMutation = useMutation({
        mutationKey: ["dislike", { userId: session.user.id, itemId }],
        mutationFn: () => {
            setIsUserLiked(false);
            setFakeLikesCount((fakeLikesCount) => fakeLikesCount - 1);

            return handleUserDislike(session.user.id, itemId);
        },
    });

    useEffect(() => {
        likes.forEach((like) => {
            if (like.userId === session.user.id) {
                setIsUserLiked(true);
                return;
            }
        });
    }, []);

    if (isUserLiked) {
        return (
            <div className="flex items-center gap-x-2">
                <button
                    className="button ghost w-fit"
                    onClick={() => dislikeMutation.mutate()}
                >
                    <FaHeart />
                </button>
                <h1>{fakeLikesCount}</h1>
            </div>
        );
    } else {
        return (
            <div className="flex items-center gap-x-2">
                <button
                    className="button ghost w-fit"
                    onClick={() => likeMutation.mutate()}
                >
                    <FaHeartBroken />
                </button>
                <h1>{fakeLikesCount}</h1>
            </div>
        );
    }
};

export default LikeTool;

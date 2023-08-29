"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserCartItem = async (userId: string) => {
    return await prisma.cartItem.findMany({
        where: { userId },
        include: {
            item: true,
        },
    });
};

export const removeUserCartItem = async (cartItemId: string) => {
    return await prisma.cartItem.deleteMany({
        where: { id: cartItemId },
    });
};

export const changeAmount = async (amount: number, cartItemId: string) => {
    return await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { amount },
    });
};

"use server";

import { MAX_ITEMS_PER_FEED } from "@/constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
};

export const getUserItems = async (id: string, pageNumber: number) => {
    const items = await prisma.item.findMany({
        where: {
            sellerId: id,
        },
        skip: (pageNumber - 1) * MAX_ITEMS_PER_FEED,
        take: MAX_ITEMS_PER_FEED,
    });
    const amount = await prisma.item.count({
        where: {
            sellerId: id,
        },
    });

    return { items, amount };
};

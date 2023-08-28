"use server";

import { MAX_ITEMS_PER_FEED } from "@/constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface createNewItemProps {
    name: string;
    price: number;
    description: string;
    image: string;
    userId: string;
}

export const createNewItem = async (props: createNewItemProps) => {
    return await prisma.item.create({
        data: {
            name: props.name,
            price: props.price,
            description: props.description,
            image: props.image,
            sellerId: props.userId,
        },
    });
};

export const getNewestItem = async (pageNumber: number) => {
    const items = await prisma.item.findMany({
        skip: (pageNumber - 1) * MAX_ITEMS_PER_FEED,
        take: MAX_ITEMS_PER_FEED,
    });
    const amount = await prisma.item.count();
    return { items, amount };
};

export const getItemById = async (id: string) => {
    return await prisma.item.findUnique({
        where: { id },
        include: {
            seller: true,
            likes: true,
        },
    });
};

export const handleUserLike = async (userId: string, itemId: string) => {
    return await prisma.like.create({
        data: {
            userId,
            itemId,
        },
    });
};

export const handleUserDislike = async (userId: string, itemId: string) => {
    return await prisma.like.deleteMany({
        where: {
            userId: { equals: userId },
            itemId: { equals: itemId },
        },
    });
};

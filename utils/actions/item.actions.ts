"use server";

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

import { Item } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const ItemCard = ({ item }: { item: Item }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [isShowingModal, setIsShowingModal] = useState(false);

    return (
        <div className="border border-slate-400 rounded overflow-hidden">
            <div
                className="w-full aspect-square overflow-hidden relative"
                onMouseEnter={() => {
                    setIsShowingModal(true);
                }}
                onMouseLeave={() => setIsShowingModal(false)}
            >
                <Image
                    src={item.image}
                    alt=""
                    fill
                    onLoadingComplete={() => setIsImageLoading(false)}
                    objectFit="cover"
                />
                {isImageLoading && (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                        <FaSpinner />
                    </div>
                )}
                {isShowingModal && (
                    <div className="z-10 absolute inset-0 bg-black opacity-75 flex flex-col items-center justify-end px-6 py-4 gap-y-4">
                        <Link
                            href={`/item?id=${item.id}`}
                            className="button ghost w-full text-center"
                        >
                            Detail
                        </Link>
                        <button className="button ghost w-full">
                            Add to Cart
                        </button>
                    </div>
                )}
            </div>
            <div className="px-6 py-4">
                <h1 className="truncate font-semibold block mb-2">
                    {item.name}
                </h1>
                <h2 className="text-sm text-slate-600">${item.price}</h2>
            </div>
        </div>
    );
};

export default ItemCard;

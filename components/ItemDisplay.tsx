import { Item } from "@prisma/client";
import ItemCard from "./ItemCard";

const ItemDisplay = ({ items }: { items: Item[] }) => {
    if (items.length === 0) {
        return (
            <div>
                <h1 className="text-2xl font-bold text-slate-600 text-center">
                    Out of items
                </h1>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {items.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ItemDisplay;

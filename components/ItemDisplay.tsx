import { Item } from "@prisma/client";
import ItemCard from "./ItemCard";

const ItemDisplay = ({ items }: { items: Item[] }) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {items.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ItemDisplay;

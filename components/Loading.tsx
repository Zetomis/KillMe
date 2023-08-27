import { FaCircle } from "react-icons/fa";

const Loading = () => {
    return (
        <div className="flex items-center justify-center gap-x-2">
            <div className="text-slate-800 text-2xl font-bold">Loading</div>
            <span className="text-xl text-teal-500">
                <FaCircle />
            </span>
            <span className="text-xl text-red-500">
                <FaCircle />
            </span>
            <span className="text-xl text-blue-500">
                <FaCircle />
            </span>
        </div>
    );
};

export default Loading;

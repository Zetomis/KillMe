import { MAX_ITEMS_PER_FEED } from "@/constants";
import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

// I know this is a bad code, but im far worse than this

const PaginationTool = ({
    pageNumber,
    setPageNumber,
    amount,
}: {
    pageNumber: number;
    setPageNumber: Dispatch<SetStateAction<number>>;
    amount: number;
}) => {
    const [totalPagesAmount, setTotalPagesAmount] = useState(
        Math.ceil(amount / MAX_ITEMS_PER_FEED)
    );

    useEffect(() => {
        if (pageNumber < 1) {
            setPageNumber(1);
        }

        if (pageNumber > totalPagesAmount) {
            setPageNumber(totalPagesAmount);
        }
    }, [pageNumber]);

    const PrevButton = () => {
        return (
            <button
                className="button default"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber((pageNumber) => pageNumber - 1)}
            >
                <FaChevronLeft />
            </button>
        );
    };

    const NextButton = () => {
        return (
            <button
                className="button default"
                disabled={pageNumber >= totalPagesAmount}
                onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
            >
                <FaChevronRight />
            </button>
        );
    };

    const PageButton = ({ page }: { page: number }) => {
        if (page > totalPagesAmount) {
            return null;
        }
        return (
            <button
                className="button default"
                onClick={() => setPageNumber(page)}
                disabled={pageNumber === page}
            >
                {page}
            </button>
        );
    };

    const AnyPageButton = () => {
        const [inputPage, setInputPage] = useState<number>(1);

        const handleSubmit = (event: FormEvent) => {
            event.preventDefault();
            setPageNumber(inputPage);
        };

        return (
            <form onSubmit={(event) => handleSubmit(event)}>
                <input
                    type="number"
                    className="input mb-0"
                    placeholder="..."
                    onChange={(event) =>
                        setInputPage(Number(event.target.value))
                    }
                />
            </form>
        );
    };

    const getPagesButton = () => {
        switch (totalPagesAmount) {
            case 1:
                return (
                    <>
                        <PageButton page={pageNumber} />
                    </>
                );
            case 2:
                return (
                    <>
                        <PageButton page={pageNumber} />
                        <PageButton page={pageNumber + 1} />
                    </>
                );
            case 3:
                return (
                    <>
                        <PageButton page={pageNumber} />
                        <PageButton page={pageNumber + 1} />
                        <PageButton page={pageNumber + 2} />
                    </>
                );
            case 4:
                return (
                    <>
                        <PageButton page={pageNumber} />
                        <PageButton page={pageNumber + 1} />
                        <PageButton page={pageNumber + 2} />
                        <PageButton page={pageNumber + 3} />
                    </>
                );
            default:
                return (
                    <>
                        <PageButton page={pageNumber} />
                        <PageButton page={pageNumber + 1} />
                        <PageButton page={pageNumber + 2} />
                        <PageButton page={pageNumber + 3} />
                        <AnyPageButton />
                    </>
                );
        }
    };

    return (
        <div className="flex items-center gap-x-2 justify-center">
            <PrevButton />
            {getPagesButton()}
            <NextButton />
        </div>
    );
};

export default PaginationTool;

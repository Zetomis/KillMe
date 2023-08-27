"use client";
import Loading from "@/components/Loading";
import UnAuth from "@/components/UnAuth";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useUploadThing } from "@/utils/libs/uploadthing";
import { createNewItem } from "@/utils/actions/item.actions";

const CreatePage = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "unauthenticated") {
        return <UnAuth />;
    }

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File>();

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: async (files) => {
            if (files && status === "authenticated") {
                createNewItemMutation.mutate({
                    imageUrl: files[0].url,
                    userId: session.user.id,
                });
            }
        },
    });
    const createNewItemMutation = useMutation({
        mutationKey: ["createdItem"],
        mutationFn: ({
            imageUrl,
            userId,
        }: {
            imageUrl: string;
            userId: string;
        }) => {
            return createNewItem({
                name,
                price,
                description,
                image: imageUrl,
                userId,
            });
        },
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (image) {
            startUpload([image]);
        } else {
            alert("Image is required");
        }
    };

    return (
        <form
            className="py-4 px-6 border border-slate-400 rounded flex flex-col gap-y-2 w-full max-w-screen-md mx-auto"
            onSubmit={(event) => handleSubmit(event)}
        >
            <h1 className="text-2xl font-bold text-center">Create New Item</h1>

            <div>
                <label className="label" htmlFor="name">
                    Name
                </label>
                <input
                    className="input"
                    type="text"
                    id="name"
                    onChange={(event) => setName(event.target.value)}
                />
            </div>

            <div>
                <label className="label" htmlFor="price">
                    Price
                </label>
                <input
                    className="input"
                    type="number"
                    id="price"
                    onChange={(event) => setPrice(Number(event.target.value))}
                />
            </div>

            <div>
                <label className="label" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="input"
                    id="description"
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>

            <div>
                <label className="label button ghost mb-2" htmlFor="image">
                    Image
                </label>
                <input
                    className="input hidden"
                    type="file"
                    id="image"
                    onChange={(event) => {
                        if (event.target.files) {
                            setImage(event.target.files[0]);
                        }
                    }}
                />
            </div>

            <button
                className="button default"
                disabled={isUploading || createNewItemMutation.isLoading}
            >
                Create
            </button>
        </form>
    );
};

export default CreatePage;

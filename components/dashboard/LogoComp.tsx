"use client";

import { uploadImage } from "@/lib/actions/storage";
import { useState } from "react";
import { toast } from "sonner";
import React from "react";

interface LogoCompProps {
    image: string | null;
    setImage: (url: string | null) => void;
}
const LogoComp = ({ image, setImage }: LogoCompProps) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // Basic validation
        if (!selectedFile.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        try {
            // Upload to Firebase
            const url = await uploadImage(selectedFile);
            setImage(url);
            setFile(selectedFile);
            toast.success("Image uploaded successfully!");
            console.log("image available at:", url);
        } catch (error) {
            toast.error("Failed to upload image");
        }
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];

        if (droppedFile && droppedFile.type.startsWith("image/")) {
            try {
                const url = await uploadImage(droppedFile);
                setImage(url);
                setFile(droppedFile);
                toast.success("Image uploaded successfully!");
            } catch (error) {
                toast.error("Failed to upload image");
            }
        }
    };
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-stone-500">
                Logo Upload
            </label>

            {/* Wrap the entire drop zone with a label */}
            <label htmlFor="fileUpload" className="cursor-pointer">
                <div
                    className="relative h-48 w-full rounded-lg border-2 border-dashed border-stone-300 bg-stone-50 flex flex-col items-center justify-center transition-colors hover:border-stone-400 dark:border-stone-600 dark:bg-stone-900"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                >
                    {image ? (
                        <div className="relative h-full w-full flex items-center justify-center">
                            <img
                                src={image}
                                alt="Uploaded"
                                className="max-h-full max-w-full rounded-lg object-cover"
                            />
                            <button
                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent label from triggering
                                    setImage(null);
                                    setFile(null);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-stone-500 text-sm">
                                Drag & drop image or{" "}
                                <span className="text-black dark:text-white">
                                    browse files
                                </span>
                            </p>
                            <p className="text-xs text-stone-400 mt-1">
                                Recommended size: 400x400px
                            </p>
                        </div>
                    )}
                </div>
            </label>

            {/* Hidden file input */}
            <input
                id="fileUpload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};
export default LogoComp;

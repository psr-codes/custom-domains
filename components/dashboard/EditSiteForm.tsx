"use client";
import { socialsData, tokenomicsData } from "@/lib/data";
import { uploadImage } from "@/lib/actions/storage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { updateSiteAction } from "@/lib/actions/actions";
import LogoComp from "@/components/dashboard/LogoComp";
import { Site } from "@prisma/client";
import isEqual from "lodash/isEqual";

interface EditSiteFormProps {
    site: Site & {
        socials: any;
        tokenomics: any;
    };
}
import { useWallet } from "@solana/wallet-adapter-react";

export default function EditSiteForm({ site }: EditSiteFormProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [image, setImage] = useState<string | null>(site.logoUrl);
    const [originalData] = useState({
        ...site,
        socials: site.socials || {},
        tokenomics: site.tokenomics || {},
    });

    const [formData, setFormData] = useState({
        name: site.name,

        description: site.description,
        logoUrl: site.logoUrl,
        socials: {
            twitter: site.socials?.twitter || "",
            discord: site.socials?.discord || "",
            telegram: site.socials?.telegram || "",
        },
        tokenomics: {
            ticker: site.tokenomics?.ticker || "",
            chain: site.tokenomics?.chain || "",
            ca: site.tokenomics?.ca || "",
            buyLink: site.tokenomics?.buyLink || "",
        },
    });

    const handleValidateUpdateForm = (
        changedFields: Partial<typeof formData>
    ) => {
        if (changedFields.name && changedFields.name.trim().length < 2) {
            toast.error("Name must be at least 2 characters");
            return false;
        }

        if (
            changedFields.description &&
            changedFields.description.length > 500
        ) {
            toast.error("Description must be less than 500 characters");
            return false;
        }
        return true;
    };

    const { publicKey } = useWallet();
    const getChangedFields = () => {
        const changed: Partial<typeof formData> = {};
        const current = {
            ...formData,
            socials: { ...formData.socials },
            tokenomics: { ...formData.tokenomics },
        };

        Object.keys(formData).forEach((key) => {
            const k = key as keyof typeof formData;
            if (k === "socials" || k === "tokenomics") return;
            if (current[k] !== originalData[k]) changed[k] = current[k];
        });

        if (!isEqual(formData.socials, originalData.socials)) {
            changed.socials = formData.socials;
        }

        if (!isEqual(formData.tokenomics, originalData.tokenomics)) {
            changed.tokenomics = formData.tokenomics;
        }

        if (image !== originalData.logoUrl) {
            changed.logoUrl = image || "";
        }

        return changed;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!publicKey) {
                toast.warning("please login with wallet first");
                return;
            }
            const userWalletAddress = publicKey?.toBase58() || "";

            const changedFields = getChangedFields();
            console.log("changed fields", changedFields);

            if (Object.keys(changedFields).length === 0) {
                toast.info("No changes detected");
                return;
            }

            if (!handleValidateUpdateForm(changedFields)) {
                setIsSubmitting(false);
                toast.info("changed field are invalid");
                return;
            }

            const updateData: any = { id: site.id };
            if (changedFields.name) updateData.name = changedFields.name;

            if (changedFields.description)
                updateData.description = changedFields.description;
            if (changedFields.logoUrl)
                updateData.logoUrl = changedFields.logoUrl;
            if (changedFields.socials)
                updateData.socials = changedFields.socials;
            if (changedFields.tokenomics)
                updateData.tokenomics = changedFields.tokenomics;

            const updatedSite = await updateSiteAction(
                updateData,
                userWalletAddress
            );

            toast.success("Site updated successfully!");
            console.log("updatedSite", updatedSite);

            const url = `${site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
            const new_url = process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `https://${url}`
                : `http://${site?.subdomain}.localhost:3000`;
            router.push(new_url);
        } catch (error) {
            console.error("Update error:", error);
            toast.error(
                `Update failed: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
            {/* confirmation dialog */}

            <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="font-cal text-3xl font-bold  dark:text-white">
                        Edit Site{" "}
                        <span className="text-pink-500  "> {site?.name}</span>
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="w-full rounded-md md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
                >
                    {/* Form fields same as create form */}
                    <div className="relative flex flex-col px-5 py-3 md:px-10">
                        <div className="flex-1 space-y-4 px-5 md:px-10">
                            {/* // basic details */}
                            <div className="relative flex flex-col px-5 py-3 md:px-10">
                                <div className="flex-1 space-y-4 px-5 md:px-10">
                                    <h2 className="font-cal text-2xl dark:text-white">
                                        Basic Details (of course mandatory)
                                    </h2>
                                    <div className="   flex justify-between items-start p-2 rounded-md text-white  ">
                                        <div className="   w-full">
                                            {" "}
                                            {/* Site Name Field */}
                                            <div className="flex flex-col space-y-2">
                                                <label
                                                    htmlFor="name"
                                                    className="text-sm font-medium text-stone-500 dark:text-stone-400"
                                                >
                                                    Project/ Token Name
                                                </label>
                                                <div className="flex w-full max-w-md">
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        placeholder="Doge Coin"
                                                        autoFocus
                                                        value={formData.name}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        maxLength={32}
                                                        className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                                                    />{" "}
                                                </div>
                                            </div>
                                            {/* 
                                                      add description field */}
                                            <div className="mr-5">
                                                <label
                                                    htmlFor="description"
                                                    className="text-sm font-medium text-stone-500"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    name="description"
                                                    placeholder="Tell something nice about your project..."
                                                    value={formData.description}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                    rows={5}
                                                    className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                                                />
                                            </div>
                                        </div>{" "}
                                        {/* Logo Component */}
                                        <div className="  w-1/3">
                                            <LogoComp
                                                image={image}
                                                setImage={setImage}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* // tokenomics */}
                            <div className="relative flex flex-col px-5 py-3 md:px-10">
                                <div className="flex-1 space-y-4 px-5 md:px-10">
                                    <h2 className="font-cal text-2xl dark:text-white">
                                        Token Information (Yeah mandatory too)
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {tokenomicsData.map((token) => (
                                            <div
                                                key={token.name}
                                                className="flex flex-col space-y-1"
                                            >
                                                <label className="text-sm text-stone-500">
                                                    {token.name}
                                                </label>
                                                <input
                                                    type={token.fieldType}
                                                    placeholder={
                                                        token.placeholder
                                                    }
                                                    value={
                                                        formData.tokenomics[
                                                            token.id as keyof typeof formData.tokenomics
                                                        ]
                                                    }
                                                    className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm dark:border-stone-600 dark:bg-black dark:text-white"
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            tokenomics: {
                                                                ...formData.tokenomics,
                                                                [token.id]:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>{" "}
                            {/* social */}
                            <div className="relative flex flex-col px-5 py-3 md:px-10">
                                <div className="flex-1 space-y-4 px-5 md:px-10">
                                    <h2 className="font-cal text-2xl dark:text-white">
                                        Social Links (Optional but hey don't you
                                        wanna make millions?)
                                    </h2>
                                    <div className="space-y-3">
                                        {socialsData.map((social) => (
                                            <div
                                                key={social?.name}
                                                className="flex flex-col space-y-1"
                                            >
                                                <label className="text-sm text-stone-500">
                                                    {social?.name} URL
                                                </label>
                                                <input
                                                    type="url"
                                                    placeholder={
                                                        social?.placeholder
                                                    }
                                                    value={
                                                        formData.socials[
                                                            social.name as keyof typeof formData.socials
                                                        ]
                                                    }
                                                    className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm focus:border-black focus:outline-none dark:border-stone-600 dark:bg-black dark:text-white"
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            socials: {
                                                                ...formData.socials,
                                                                [social?.name]:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Include all other form fields from create form */}
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 md:px-10 dark:border-stone-700 dark:bg-stone-800">
                        <button
                            type="submit"
                            className={cn(
                                "flex w-full cursor-pointer h-10 items-center justify-center space-x-2 rounded-md border text-sm transition-all",
                                isSubmitting
                                    ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400"
                                    : "border-black bg-black text-white hover:bg-white hover:text-black"
                            )}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <LoadingDots color="#808080" />
                            ) : (
                                "Update Site"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Reuse your existing LogoComp component

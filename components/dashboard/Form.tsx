"use client";

import { socialsData, tokenomicsData } from "@/lib/data";
import { uploadImage } from "@/lib/actions/storage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";

import TemplatesComp from "@/components/dashboard/TemplatesComp";
import CreateSiteButton from "@/components/others/create-site-button";
import CreateSiteModal from "@/components/modal/create-site";

import { useTemplateStore } from "@/lib/stores/create-form-store";

// import va from "@vercel/analytics"; // or any other analytics
import LogoComp from "@/components/dashboard/LogoComp";
import {
    createUserAction,
    createSiteAction,
    createTransactionAction,
} from "@/lib/actions/actions";

import { handleValidateForm } from "@/lib/handlers";

import { processPayment } from "@/lib/handlers";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getTotalSiteCreationFee, getTemplatePrice } from "@/lib/utils";
export default function Form() {
    const router = useRouter();

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const userWalletAddress = publicKey?.toBase58() || "";

    const [isSubmitting, setIsSubmitting] = useState(false);
    // logo file
    const [image, setImage] = useState<string | null>(null);

    const { selectedTemplateId, setSelectedTemplateId } = useTemplateStore();

    const [formData, setFormData] = useState({
        name: "",
        subdomain: "",
        description: "",
        logo: "",
        socials: {
            twitter: "",
            discord: "",
            telegram: "",
        },
        templateId: "",
        tokenomics: {
            ticker: "",

            chain: "",

            ca: "",

            buyLink: "",
        },
    });

    // Automatically sync subdomain with name
    // Instead of multiple useEffect calls, combine where possible
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            subdomain: prev.name
                .toLowerCase()
                .trim()
                .replace(/[\W_]+/g, "-"),
            logo: image || "",
            templateId: selectedTemplateId || "",
        }));
    }, [formData.name, image, selectedTemplateId]); // Single effect for related state
    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Step 1: Validate inputs
            if (!publicKey) {
                toast.error("Please connect your wallet first");
                return;
            }
            if (!handleValidateForm(formData, publicKey)) {
                setIsSubmitting(false);
                return;
            }

            console.log("form data:", formData);
            // get the price of template

            const totalFee = getTotalSiteCreationFee(selectedTemplateId);

            // Step 2: Process SOL payment
            const signature = await processPayment(
                totalFee,
                publicKey,
                connection,
                sendTransaction
            );

            // Step 3: Create or find user
            const user = await createUserAction(userWalletAddress);

            // Step 4: Create site record
            const site = await createSiteAction(formData, userWalletAddress);

            // Step 5: Create transaction record
            const transaction = await createTransactionAction(
                userWalletAddress,
                site,
                signature // Use actual transaction signature
            );

            // Step 6: Final success and cleanup
            toast.success("Site created successfully!");

            console.log("user: ", user);
            console.log("site: ", site);
            console.log("transaction: ", transaction);

            router.refresh();
            router.push(`/dashboard/site/${site.subdomain}`);
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(
                `Something went wrong: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            setIsSubmitting(true);
        } finally {
            setIsSubmitting(false); // Add this
        }
    };
    const [currentStep, setCurrentStep] = useState(1);
    return (
        <div className="flex max-w-screen-xl bg-black flex-col space-y-12 px-8 pb-8 pt-2">
            <div className="flex flex-col space-y-6">
                {/* Steps Indicator */}
                <div className="flex justify-center p-1 ">
                    <div className="flex space-x-8">
                        {[1, 2, 3, 4, 5].map((step) => (
                            <div
                                key={step}
                                className="flex flex-col items-center"
                            >
                                <div
                                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                        currentStep === step
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : "bg-stone-200 dark:bg-stone-700"
                                    }`}
                                >
                                    {step}
                                </div>
                                <div
                                    className={`mt-1 text-sm ${
                                        currentStep === step
                                            ? "font-medium"
                                            : "text-stone-500"
                                    }`}
                                >
                                    {
                                        [
                                            "Site Details",
                                            "Token Info",
                                            "Social Links",
                                            "Templates",
                                            "Checkout",
                                        ][step - 1]
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <form
                    onSubmit={handleSubmitForm}
                    className="relative w-full rounded-md md:border min-h-[86vh] md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
                >
                    {" "}
                    <div className="flex items-center justify-between rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 md:px-10 dark:border-stone-700 dark:bg-stone-800">
                        <div>
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentStep(currentStep - 1)
                                    }
                                    className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700"
                                >
                                    Previous
                                </button>
                            )}
                        </div>

                        <div>
                            {currentStep < 5 ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentStep(currentStep + 1)
                                    }
                                    className="cursor-pointer rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200"
                                >
                                    Next
                                </button>
                            ) : (
                                <CreateSiteFormButton
                                    isSubmitting={isSubmitting}
                                />
                            )}
                        </div>
                    </div>
                    {/* Step 1 - Site Details */}
                    {currentStep === 1 && (
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
                                                    required
                                                    className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                                                />{" "}
                                            </div>
                                        </div>
                                        {/* Subdomain Field */}
                                        <div className="flex flex-col space-y-2 my-6">
                                            <label
                                                htmlFor="subdomain"
                                                className="text-sm font-medium text-stone-500"
                                            >
                                                Subdomain
                                            </label>
                                            <div className="flex w-full max-w-md">
                                                <input
                                                    name="subdomain"
                                                    type="text"
                                                    placeholder="subdomain"
                                                    value={formData.subdomain}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            subdomain:
                                                                e.target.value,
                                                        })
                                                    }
                                                    autoCapitalize="off"
                                                    pattern="[a-zA-Z0-9\-]+"
                                                    maxLength={32}
                                                    required
                                                    className="w-full rounded-l-lg border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                                                />
                                                <div className="flex items-center rounded-r-lg border border-l-0 border-stone-200 bg-stone-100 px-3 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400">
                                                    .
                                                    {
                                                        process.env
                                                            .NEXT_PUBLIC_ROOT_DOMAIN
                                                    }
                                                </div>
                                            </div>
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
                                {/* 
                          add description field */}

                                <div>
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
                                                description: e.target.value,
                                            })
                                        }
                                        rows={4}
                                        required
                                        className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Step 2 - Token Info */}
                    {currentStep === 2 && (
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
                                                placeholder={token.placeholder}
                                                required={token.id != "buyLink"}
                                                className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm dark:border-stone-600 dark:bg-black dark:text-white"
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        tokenomics: {
                                                            ...formData.tokenomics,
                                                            [token.id]:
                                                                e.target.value,
                                                        },
                                                    })
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Step 3 - Social Links */}
                    {currentStep === 3 && (
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
                                                className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm focus:border-black focus:outline-none dark:border-stone-600 dark:bg-black dark:text-white"
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        socials: {
                                                            ...formData.socials,
                                                            [social?.name]:
                                                                e.target.value,
                                                        },
                                                    })
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Step 4 - Choose Template */}
                    {currentStep === 4 && (
                        <div className="relative  max-h-screen overflow-scroll flex flex-col px-5  md:px-10">
                            <TemplatesComp subdomain="Your Site" />
                        </div>
                    )}
                    {/* Step 5 - Checkout */}
                    {/* Step 5 - Checkout */}
                    {currentStep === 5 && (
                        <div className="relative flex flex-col px-5 py-3 md:px-10">
                            <div className="flex-1 space-y-6 px-5 md:px-10 text-center">
                                <div className="animate-bounce text-6xl">
                                    🚀
                                </div>

                                <h2 className="font-cal text-3xl dark:text-white">
                                    Ready to Launch! (Almost)
                                </h2>

                                <div className="space-y-4 text-stone-600 dark:text-stone-300">
                                    {/* Price Breakdown */}
                                    <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-lg space-y-2">
                                        <div className="space-y-1">
                                            {/* Base Fee */}
                                            <div className="flex justify-between">
                                                <span>Site Creation Fee:</span>
                                                <span className="font-mono">
                                                    {Number(
                                                        process.env
                                                            .NEXT_PUBLIC_RECIPEINT_SITE_CREATION_FEE ||
                                                            0.1
                                                    ).toFixed(2)}{" "}
                                                    ◎ SOL
                                                </span>
                                            </div>

                                            {/* Template Line - Always shown */}
                                            <div className="flex justify-between">
                                                <span>
                                                    {selectedTemplateId
                                                        ? `Selected Template: ${selectedTemplateId}`
                                                        : "Basic Template:"}
                                                </span>
                                                <span className="font-mono">
                                                    {selectedTemplateId
                                                        ? `+${getTemplatePrice(
                                                              selectedTemplateId
                                                          ).toFixed(2)} ◎ SOL`
                                                        : "Basic Chad (Free)"}
                                                </span>
                                            </div>

                                            {/* Total Price */}
                                            <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-700">
                                                <span className="font-medium">
                                                    Total:
                                                </span>
                                                <span className="font-mono text-lg font-bold">
                                                    {getTotalSiteCreationFee(
                                                        selectedTemplateId
                                                    ).toFixed(2)}{" "}
                                                    ◎ SOL
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            disabled={isSubmitting}
                                            className="cursor-pointer mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
                                        >
                                            {getTotalSiteCreationFee(
                                                selectedTemplateId
                                            ) > 0.1
                                                ? `Pay ${getTotalSiteCreationFee(
                                                      selectedTemplateId
                                                  ).toFixed(2)} SOL`
                                                : "Take My SOL Already!"}
                                        </button>
                                    </div>

                                    {/* Updated informational text */}
                                    <p className="text-sm">
                                        {selectedTemplateId ? (
                                            <>
                                                You've selected the{" "}
                                                <strong>
                                                    {selectedTemplateId}
                                                </strong>{" "}
                                                template
                                                <span className="block mt-2">
                                                    Remember you can always:
                                                </span>
                                            </>
                                        ) : (
                                            <span className="block mt-2">
                                                You can always:
                                            </span>
                                        )}
                                    </p>

                                    <ul className="list-disc list-inside text-left space-y-2 max-w-md mx-auto">
                                        <li>
                                            🛠️ Change templates anytime (for
                                            free!)
                                        </li>
                                        <li>
                                            🎨 Make it uglier/less ugly (👀)
                                        </li>
                                        <li>
                                            🤖 Add more features than a Swiss
                                            Army knife
                                        </li>
                                    </ul>

                                    <p className="text-xs pt-4">
                                        "But wait, I want to be fancy later!" -
                                        No worries mate,
                                        <br />
                                        all upgrades are free. We're not your
                                        ex, we don't do hidden fees.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Navigation Controls */}
                    <div className="absolute bottom-0 w-full flex items-center justify-between rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 md:px-10 dark:border-stone-700 dark:bg-stone-800">
                        <div>
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentStep(currentStep - 1)
                                    }
                                    className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-700"
                                >
                                    Previous
                                </button>
                            )}
                        </div>

                        <div>
                            {currentStep < 5 ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentStep(currentStep + 1)
                                    }
                                    className="cursor-pointer rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200"
                                >
                                    Next
                                </button>
                            ) : (
                                <CreateSiteFormButton
                                    isSubmitting={isSubmitting}
                                />
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

// This button uses the experimental useFormStatus() to show loading state
function CreateSiteFormButton({ isSubmitting }: { isSubmitting: boolean }) {
    return (
        <button
            className={cn(
                "cursor-pointer flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
                isSubmitting
                    ? "min-w-[40px] cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                    : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
            )}
            disabled={isSubmitting}
        >
            {isSubmitting ? (
                <LoadingDots color="#808080" />
            ) : (
                <p className="px-5">Pay & Create</p>
            )}
        </button>
    );
}

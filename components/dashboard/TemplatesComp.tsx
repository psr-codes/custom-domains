"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { updateSiteAction } from "@/lib/actions/actions";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { templatesData } from "@/lib/data";
// Template data
import { toast } from "sonner";

import { useSiteStore } from "@/lib/stores/site-store";

// Get all unique categories
const allCategories = Array.from(
    new Set(templatesData.flatMap((template) => template.categories))
);

import { fetchSiteDataAction } from "@/lib/actions/actions";
import { Site } from "@prisma/client";

import { useTemplateStore } from "@/lib/stores/create-form-store";
export default function TemplatesComp({ subdomain }: { subdomain: string }) {
    const { publicKey } = useWallet();
    const userWalletAddress = publicKey?.toBase58() || "";

    const url = `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [filteredTemplates, setFilteredTemplates] = useState(templatesData);

    const [siteData, setSiteData] = useState<Site | null>(null);
    const [loading, setLoading] = useState(true);

    const { currentSiteData, setCurrentSiteData } = useSiteStore();

    const { selectedTemplateId, setSelectedTemplateId } = useTemplateStore();

    useEffect(() => {
        const fetchData = async () => {
            if (subdomain == null || subdomain == "Your Site") return;
            if (
                currentSiteData != null &&
                currentSiteData?.subdomain == subdomain
            ) {
                return;
            }
            try {
                const result = await fetchSiteDataAction(subdomain);

                if (result) {
                    setSiteData(result);
                    setCurrentSiteData(result);
                } else {
                    toast.error("Site not found");
                }
                console.log("site data", result);
            } catch (error) {
                toast.error("Failed to fetch site data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [subdomain, publicKey]);

    // Filter templatesData based on search query and selected category
    useEffect(() => {
        let filtered = templatesData;

        if (searchQuery) {
            filtered = filtered.filter((template) =>
                template.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory && selectedCategory != "all") {
            filtered = filtered.filter((template) =>
                template.categories.includes(selectedCategory)
            );
        }

        setFilteredTemplates(filtered);
    }, [searchQuery, selectedCategory]);

    // // Handle template click
    // const handleTemplateClick = (templateId: string) => {
    //     router.push(`/dashboard/preview/${templateId}`);
    // };

    async function selectTemplate(templateId: string) {
        try {
            // check if subdomain is "your site" means in form creating
            if (subdomain == "Your Site") {
                setSelectedTemplateId(templateId);
                toast.success("Template Selected Successfully");
                return;
            }

            if (!publicKey) {
                toast.error("please connect wallet first...");
                return;
            }
            console.log("templateId", templateId);
            console.log(
                "currentSiteData?.templateId",
                currentSiteData?.templateId
            );

            if (templateId === currentSiteData?.templateId) {
                toast.warning("This Template is Already Active...");
                return;
            }
            console.log("updating template", templateId, currentSiteData);
            // Use existing update action
            const updatedSite = await updateSiteAction(
                {
                    id: currentSiteData?.id || "",
                    templateId: templateId,
                },
                userWalletAddress
            );
            const message = templateId + " set as new theme ✅";
            toast.success(message);

            // update the templateId field in currentSiteData
            setCurrentSiteData((prev) => ({
                ...prev!,
                templateId: templateId,
            }));
        } catch (error) {
            console.log("Error selecting template:", error);
            toast.error("Error selecting template...");
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0b24] text-white p-6">
            {" "}
            <div className="flex justify-start items-center gap-5 pb-5">
                <h1 className="font-cal text-xl font-bold sm:text-3xl dark:text-white">
                    Templates for {subdomain}
                </h1>
                <a
                    href={
                        process.env.NEXT_PUBLIC_VERCEL_ENV
                            ? `https://${url}`
                            : `http://${subdomain}.localhost:3000`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                >
                    {url} ↗
                </a>
            </div>
            <div className="max-w-7xl mx-auto">
                {/* Search and filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search templatesData..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-[#141539] border-[#2a2c57] text-white"
                        />
                    </div>
                    <Select
                        onValueChange={(value) =>
                            setSelectedCategory(value || null)
                        }
                    >
                        <SelectTrigger className="w-full md:w-[200px] bg-[#141539] border-[#2a2c57] text-white">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#141539] border-[#2a2c57] text-white">
                            <SelectItem value="all">All categories</SelectItem>
                            {allCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category.charAt(0).toUpperCase() +
                                        category.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* Templates grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                        <div
                            key={template.id}
                            className="group border border-[#2a2c57] rounded-xl overflow-hidden transition-transform hover:scale-[1.02] relative"
                        >
                            <div className="relative h-[220px] w-full bg-[#141539] overflow-hidden">
                                <Image
                                    src={
                                        template?.image ||
                                        "/template-placeholder2.png"
                                    }
                                    alt={template.name}
                                    fill
                                    className="object-cover"
                                />

                                {/* Browser-like UI elements */}
                                <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-2 bg-[#0a0b24]/80">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-white/50"></div>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity w-full   flex items-center justify-center gap-4">
                                    <Link
                                        href={`/templates/preview/${template.id}`}
                                        target="_blank"
                                        onClick={() => {
                                            localStorage.setItem(
                                                "previousPath",
                                                window.location.pathname
                                            );
                                        }}
                                        className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Preview
                                    </Link>
                                    <button
                                        onClick={() => {
                                            selectTemplate(template.id);
                                        }}
                                        type="button"
                                        className="px-4 cursor-pointer py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        Select Theme
                                    </button>
                                </div>

                                {template.featured && (
                                    <div className="absolute top-4 left-0">
                                        <Badge className="bg-yellow-500 text-black rounded-r-md rounded-l-none px-3 py-1">
                                            Featured
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-[#0a0b24]">
                                <h3 className="text-lg font-medium text-center">
                                    {template.name}
                                </h3>
                                <p className="text-center text-gray-400 mt-1">
                                    {template.price} {template.currency}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {filteredTemplates.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400">
                            No templatesData found matching your criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

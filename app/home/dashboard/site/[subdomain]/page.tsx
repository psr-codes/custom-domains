"use client";
import { useState, useEffect } from "react";
import { fetchSiteDataAction } from "@/lib/actions/actions";
import { Site } from "@prisma/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import EditSiteForm from "@/components/dashboard/EditSiteForm";
export default function SitePage({
    params,
}: {
    params: Promise<{ subdomain: string }>;
}) {
    const { publicKey } = useWallet();
    const [siteData, setSiteData] = useState<Site | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { subdomain } = await params;
                const result = await fetchSiteDataAction(subdomain);

                if (result) {
                    setSiteData(result);
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
    }, [params, publicKey]); // Add proper dependencies

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!siteData) {
        return <div>Site not found</div>;
    }

    return <div>{siteData && <EditSiteForm site={siteData} />}</div>;
}

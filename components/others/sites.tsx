"use client";
import { useEffect, useState } from "react";
// import { getSession } from "@/lib/auth";
import { useWallet } from "@solana/wallet-adapter-react";

// import db from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import SiteCard from "@/components/others/site-card";
import { fetchAllSitesAction } from "@/lib/actions/actions";
import { toast } from "sonner";
export default function Sites() {
    const { publicKey } = useWallet();
    const userWalletAddress = publicKey?.toBase58() || "";

    const [sites, setSites] = useState<any[]>([]);

    useEffect(() => {
        async function fetchSites() {
            if (!publicKey) return;
            const result = await fetchAllSitesAction(userWalletAddress);
            if (result.length === 0) {
                toast.error("Error fetching sites. Please try again later.");
            }

            console.log("all sites;", result);
            setSites(result);
        }
        fetchSites();
    }, []);

    return sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {sites.map((site) => (
                <SiteCard key={site.id} data={site} />
            ))}
        </div>
    ) : (
        <div className="mt-20 flex flex-col items-center space-x-4">
            <h1 className="font-cal text-4xl">No Sites Yet</h1>
            <Image
                alt="missing site"
                src="https://illustrations.popsy.co/gray/web-design.svg"
                width={400}
                height={400}
            />
            <p className="text-lg text-stone-500">
                You do not have any sites yet. Create one to get started.
            </p>
        </div>
    );
}

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ subdomain: string }>;
}): Promise<Metadata | null> {
    const { subdomain } = await params;
    // Replace with your data fetching logic as needed
    const data = { name: "Company", logo: "/logo.png" };

    if (!data) {
        return null;
    }
    const {
        name: title,
        description,
        image,
        logo,
    } = data as {
        name: string;
        description: string;
        image: string;
        logo: string;
    };

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [image],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@vercel",
        },
        icons: [logo],
        metadataBase: new URL(`https://${subdomain}`),
    };
}

export default async function SiteLayout({
    params,
    children,
}: {
    params: Promise<{ subdomain: string }>;
    children: ReactNode;
}) {
    const { subdomain } = await params;

    // Replace with your data fetching logic as needed
    const data = { name: "Company", logo: "/logo.png" };

    if (!data) {
        notFound();
    }

    return <div className="bg-white text-black min-h-screen">{children}</div>;
}

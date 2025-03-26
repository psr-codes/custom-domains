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

    const baseUrl =
        process.env.NODE_ENV === "development"
            ? `http://${subdomain}.localhost:3000`
            : `https://${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

    // return {
    //     title,
    //     description,
    //     openGraph: {
    //         title,
    //         description,
    //         images: [image],
    //     },
    //     twitter: {
    //         card: "summary_large_image",
    //         title,
    //         description,
    //         images: [image],
    //         creator: "@vercel",
    //     },
    //     icons: [logo],
    //     metadataBase: new URL(baseUrl),
    // };

    try {
        return {
            title: "Your Site Title",
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
            metadataBase: new URL(baseUrl),
        };
    } catch (error) {
        console.error("Invalid URL construction:", error);
        return {
            // title: "Fallback Title",
            title: data?.name,
            metadataBase: new URL(
                process.env.NEXT_PUBLIC_FALLBACK_URL || "http://localhost:3000"
            ),
        };
    }
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

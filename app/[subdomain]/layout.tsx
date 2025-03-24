import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
// import { getSiteData } from "@/lib/fetchers";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: { domain: string };
}): Promise<Metadata | null> {
    const domain = decodeURIComponent(params.domain);
    // const data = await getSiteData(domain);

    const data = { name: "Company", logo: "/logo.png" }; // Example data

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
        metadataBase: new URL(`https://${domain}`),
        // Optional: Set canonical URL to custom domain if it exists
        // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
        //   data.customDomain && {
        //     alternates: {
        //       canonical: `https://${data.customDomain}`,
        //     },
        //   }),
    };
}

export default async function SiteLayout({
    params,
    children,
}: {
    params: { domain: string };
    children: ReactNode;
}) {
    const domain = decodeURIComponent(params.domain);
    // const data = await getSiteData(domain);
    const data = { name: "Company", logo: "/logo.png" }; // Example data

    if (!data) {
        notFound();
    }

    return <div className="  bg-white text-black min-h-screen">{children}</div>;
}

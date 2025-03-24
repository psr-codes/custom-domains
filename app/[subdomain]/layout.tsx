import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Params = Promise<{ subdomain: string }>;

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { subdomain } = await params;
    const decodedSubdomain = decodeURIComponent(subdomain);

    // Replace with actual data fetching
    const data = {
        name: "Company",
        description: "Default description",
        image: "/og-image.png",
        logo: "/logo.png",
    };

    return {
        title: data.name,
        description: data.description,
        openGraph: {
            title: data.name,
            description: data.description,
            images: [data.image],
        },
        twitter: {
            card: "summary_large_image",
            title: data.name,
            description: data.description,
            images: [data.image],
            creator: "@vercel",
        },
        icons: [data.logo],
        metadataBase: new URL(`https://${decodedSubdomain}`),
    };
}

export default async function SiteLayout({
    params,
    children,
}: {
    params: Params;
    children: ReactNode;
}) {
    const { subdomain } = await params;
    const decodedSubdomain = decodeURIComponent(subdomain);

    // Replace with actual data fetching
    const data = { name: "Company", logo: "/logo.png" };

    if (!data) {
        notFound();
    }

    return <div className="bg-white text-black min-h-screen">{children}</div>;
}

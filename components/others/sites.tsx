"use client";
// import { getSession } from "@/lib/auth";

// import db from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import SiteCard from "@/components/others/site-card";

export default async function Sites({ limit }: { limit?: number }) {
    // const session = await getSession();

    // const sites = await db.query.sites.findMany({
    //   where: (sites, { eq }) => eq(sites.userId, session.user.id),
    //   orderBy: (sites, { asc }) => asc(sites.createdAt),
    //   ...(limit ? { limit } : {}),
    // });

    const sites = [
        {
            id: 1,
            name: "test",
        },
    ];
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

import prisma from "@/lib/prisma";

export default async function SitePage({
    params,
}: {
    params: { subdomain: string };
}) {
    const { subdomain } = params;

    // Fetch site data from the database
    const site = await prisma.site.findUnique({
        where: { subdomain },
    });

    if (!site) {
        return <div>Site not found</div>;
    }

    return (
        <div>
            <h1>{site.name}</h1>
            <img
                src={site.logoUrl || "/logo.png"}
                alt={`${site.name} logo`}
            />{" "}
        </div>
    );
}

import prisma from "@/lib/prisma";
// import A from "@/components/templates/test-templates/A";
import B from "@/components/templates/test-templates/B";

export default async function SitePage({
    params,
}: {
    params: Promise<{ subdomain: string }>;
}) {
    const { subdomain } = await params;

    // Fetch site data from the database (uncomment and adjust as needed)
    // const site = await prisma.site.findUnique({
    //   where: { subdomain },
    // });

    // if (!site) {
    //   return <div>{subdomain} Site not found</div>;
    // }

    return (
        <div className=" ">
            {/* <B subdomain={subdomain} /> */}
            <B />
        </div>
    );
}

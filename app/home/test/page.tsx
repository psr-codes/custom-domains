import prisma from "@/lib/prisma";
import A from "@/components/templates/test-templates/A";
import B from "@/components/templates/test-templates/B";
export default async function SitePage({
    params,
}: {
    params: { subdomain: string };
}) {
    const { subdomain } = params;

    // Fetch site data from the database
    // const site = await prisma.site.findUnique({
    //     where: { subdomain },
    // });

    // if (!site) {
    //     return <div>{subdomain} Site not found</div>;
    // }

    return (
        <div className="bg-white text-red-500  rounded-lg shadow overflow-clipped ">
            <h1>{subdomain}</h1>

            <A subdomain={subdomain} />
        </div>
    );
}

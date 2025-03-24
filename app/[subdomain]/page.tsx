import A from "@/components/templates/test-templates/A";
import { getSubdomain } from "@/lib/utils";
export default function SitePage({
    params,
}: {
    params: { subdomain: string };
}) {
    const { subdomain } = params;

    const sub_domain = getSubdomain(subdomain) as string;
    console.log("sub_domain", sub_domain);

    // Fetch site data from the database
    // const site = await prisma.site.findUnique({
    //     where: { subdomain },
    // });

    // if (!site) {
    //     return <div>{subdomain} Site not found</div>;
    // }

    return (
        <div className="  ">
            <A subdomain={sub_domain} />
        </div>
    );
}

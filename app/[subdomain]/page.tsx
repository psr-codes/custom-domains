import A from "@/components/templates/test-templates/A";
import { getSubdomain } from "@/lib/utils";

export default async function SitePage({
    params,
}: {
    params: Promise<{ subdomain: string }>;
}) {
    // Await the params before destructuring
    const { subdomain } = await params;
    const sub_domain = getSubdomain(subdomain) as string;
    console.log("sub_domain", sub_domain);

    // Fetch site data as needed...
    return (
        <div>
            <A subdomain={sub_domain} />
        </div>
    );
}

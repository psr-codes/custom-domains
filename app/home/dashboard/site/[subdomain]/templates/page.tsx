import { notFound, redirect } from "next/navigation";
import TemplatesComp from "@/components/dashboard/TemplatesComp";

export default async function SitePage({
    params,
}: {
    params: Promise<{ subdomain: string }>;
}) {
    const { subdomain } = await params;

    return (
        <div className=" ">
            <TemplatesComp subdomain={subdomain} />
        </div>
    );
}

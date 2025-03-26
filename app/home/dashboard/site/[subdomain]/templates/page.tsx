import { notFound, redirect } from "next/navigation";
import TemplatesComp from "@/components/dashboard/TemplatesComp";
export default async function Templates({
    params,
}: {
    params: { subdomain: string };
}) {
    const subdomain = params?.subdomain;

    return (
        <div className=" ">
            <TemplatesComp subdomain={subdomain} />
        </div>
    );
}

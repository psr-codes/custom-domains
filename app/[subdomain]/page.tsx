import ClientTemplate from "./ClientTemplate";
import { fetchSiteDataAction } from "@/lib/actions/actions";
import { getSubdomain } from "@/lib/utils";
import { notFound } from "next/navigation";
export default async function SitePage({
    params,
}: {
    params: Promise<{ subdomain: string }>;
}) {
    const { subdomain } = await params; // Now a plain string

    const processedSubdomain = getSubdomain(subdomain) as string;

    // Fetch site data
    const siteData = await fetchSiteDataAction(processedSubdomain);
    console.log("siteData:", siteData);

    // const [siteData, setSiteData] = useState<Site | null>(null);
    // console.log("fetching data", subdomain);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             console.log("subdomain", subdomain);
    //             const d = await fetchSiteDataAction(subdomain);
    //             console.log("data", d);

    //             setSiteData(d);
    //         } catch {
    //             console.log("error fetching data");
    //             toast.error("Error fetching data");
    //         }
    //     };
    //     fetchData();
    // }, [subdomain]);

    if (!siteData) notFound();

    return <ClientTemplate siteData={siteData} />;
}

import A from "@/components/templates/neon-fi/neon-fi";
// import B from "@/components/templates/default1";
import { fetchSiteDataAction } from "@/lib/actions/actions";
export default async function SitePage() {
    const subdomain = "babybaby";
    // const { subdomain } = await params;
    const siteData = await fetchSiteDataAction(subdomain);
    console.log("siteData:", siteData);

    return (
        <div className=" ">
            {/* <B subdomain={subdomain} /> */}
            <A siteData={siteData} />
            hello
        </div>
    );
}

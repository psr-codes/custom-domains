import { Suspense } from "react";
import Sites from "@/components/others/sites";
import PlaceholderCard from "@/components/others/placeholder-card";
import CreateSiteButton from "@/components/others/create-site-button";
import CreateSiteModal from "@/components/modal/create-site";
export default async function AllSites({
    params,
}: {
    params: Promise<{ subdomain: string }>;
}) {
    return (
        <div className="flex max-w-screen-xl flex-col space-y-12 p-8 bg-black">
            <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="font-cal text-3xl font-bold dark:text-white">
                        All Sites
                    </h1>
                    <CreateSiteButton>
                        <CreateSiteModal />
                    </CreateSiteButton>
                </div>
                <Suspense
                    fallback={
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <PlaceholderCard key={i} />
                            ))}
                        </div>
                    }
                >
                    <Sites />
                </Suspense>
            </div>
        </div>
    );
}

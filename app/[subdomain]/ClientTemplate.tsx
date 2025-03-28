"use client";

import dynamic from "next/dynamic";
import { Site } from "@prisma/client";

// Notice that we don't need to dynamically import here if the template depends on siteData,
// so we create a component that dynamically loads the correct template.
export default function ClientTemplate({
    siteData,
}: {
    siteData: Site | null;
}) {
    const DynamicTemplate = dynamic<{ siteData: Site | null }>(
        () =>
            import(
                `@/components/templates/${siteData?.templateId}/${siteData?.templateId}`
            ),
        {
            loading: () => <LoadingSkeleton />,
            ssr: false,
        }
    );

    return (
        <div className="container">
            <DynamicTemplate siteData={siteData} />
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="animate-pulse space-y-4 p-4">
            <div className="h-8 bg-gray-100 rounded w-1/2"></div>
            <div className="h-4 bg-gray-100 rounded w-2/3"></div>
            <div className="h-64 bg-gray-100 rounded-lg"></div>
        </div>
    );
}

"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
// This would typically come from a database or API
const validTemplates = [
    "default0",
    "default1",
    "presidente",
    "classic-moon",
    "doge-style",
    "rocket",
    "pepe-layout",
    "modern-inu",
    "space-fun",
    "ai",
    "solfun",
];

export default function Home({ params }: { params: { templateId: string } }) {
    const { templateId } = params;

    console.log("templateId", templateId);

    // Check if the templateId exists
    // if (!validTemplates.includes(templateId)) {
    //     notFound();
    // }

    // Format the templateId name for display
    const formattedName = templateId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return (
        <div className="min-h-screen bg-[#0a0b24] text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link
                        href={
                            localStorage.getItem("previousPath") ??
                            process.env.NEXT_PUBLIC_ROOT_DOMAIN ??
                            "/dashboard/templates"
                        }
                        className="text-blue-400 hover:underline flex items-center gap-2"
                    >
                        ← Back to Previous Page
                    </Link>
                </div>

                <div className="bg-[#141539] border border-[#2a2c57] rounded-xl p-8">
                    <h1 className="text-3xl font-bold mb-4">
                        {formattedName} Template Preview
                    </h1>
                    <p className="text-gray-400 mb-8">
                        This is a preview of the {formattedName} templateId. In
                        a real application, you would see the actual templateId
                        rendered here.
                    </p>

                    <div className="border border-dashed border-[#2a2c57] rounded-lg p-12 flex items-center justify-center">
                        <p className="text-xl text-center">
                            Template preview for{" "}
                            <span className="font-bold">{formattedName}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

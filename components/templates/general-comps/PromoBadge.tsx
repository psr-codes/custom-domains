import { isThemeFree } from "@/lib/utils";

const PromoBadge = ({ templateId }: { templateId: string }) => {
    // check if theme is premium
    if (!isThemeFree(templateId)) return null;
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "YourSiteName";
    const url = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "https://yoursite.com";
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group fixed bottom-3 right-3 z-50 flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-2 shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg"
            style={{ WebkitBackdropFilter: "blur(4px)" }} // Safari fallback
        >
            <span className="text-sm font-medium text-gray-700">
                Made with 💓 By
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-sm font-semibold text-transparent">
                {siteName}
            </span>
        </a>
    );
};

export default PromoBadge;

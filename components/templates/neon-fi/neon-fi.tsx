import PromptingIsAllYouNeed from "./prompting";
import Navbar from "./navbar";
import Tokenomics from "./tokenomics";
import Community from "./community";
import styles from "./Comp.module.css";
import { Site } from "@prisma/client";
import PromoBadge from "@/components/templates/general-comps/PromoBadge";
export default function Home({ siteData }: { siteData: Site | null }) {
    const contractAddress = (siteData?.tokenomics as any)?.ca;

    // const PRIMARY_TEXT = siteData?.name || "";
    // const SECONDARY_TEXT = `On ${(siteData?.tokenomics as any)?.chain}`;

    const PRIMARY_TEXT = `$${(siteData?.tokenomics as any)?.ticker} Coin`;

    const SECONDARY_TEXT = `On ${(siteData?.tokenomics as any)?.chain}`;

    return (
        <main className="bg-[#000B1E] min-h-screen overflow-x-hidden">
            <Navbar siteData={siteData} />
            {/* Home section with the game */}
            <section id="home" className="h-screen relative">
                <PromptingIsAllYouNeed
                    PRIMARY_TEXT={PRIMARY_TEXT}
                    SECONDARY_TEXT={SECONDARY_TEXT}
                />
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="animate-bounce bg-[#00FFFF]/20 p-2 w-10 h-10 ring-1 ring-[#00FFFF]/30 shadow-lg rounded-full flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-[#00FFFF]"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                    <span className="text-[#00FFFF] mt-2 block">
                        Scroll Down
                    </span>
                </div>
            </section>
            {/* Tokenomics section */}
            <Tokenomics siteData={siteData} />
            <Community siteData={siteData} />
            {/* Community section - ensure it's visible
            <div id="community-wrapper" className="relative z-10"></div> */}

            <PromoBadge templateId={siteData?.templateId as string} />
            <div className="mt-16 text-white/60 text-sm">
                <p>© 2025 {siteData?.name} • All Rights Reserved</p>
            </div>
        </main>
    );
}

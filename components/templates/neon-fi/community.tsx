import { Twitter, MessageCircle, Headphones } from "lucide-react";
import { Site } from "@prisma/client";

export default function Community({ siteData }: { siteData: Site | null }) {
    return (
        <section
            id="community"
            className="min-h-screen  backdrop-blur-md flex items-center justify-center py-20 px-4 bg-gradient-to-b  relative z-10"
        >
            <div className="bg-[#000B1E]/80 max-w-4xl w-full text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-[#00FFFF] mb-4 tracking-wider">
                    JOIN OUR COMMUNITY
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] mx-auto mb-8"></div>

                <p className="text-white text-lg max-w-2xl mx-auto mb-12">
                    Connect with fellow holders, get the latest updates, and be
                    part of our growing cyber community.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                    <a
                        href={(siteData?.socials as any)?.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <div className="bg-[#000B1E] p-8 rounded-lg border border-[#00FFFF]/30 shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] group-hover:border-[#00FFFF]/60 group-hover:translate-y-[-5px]">
                            <div className="w-16 h-16 bg-[#001F3F] rounded-full flex items-center justify-center mx-auto mb-4 text-[#00FFFF] group-hover:text-[#FFFF00] transition-colors">
                                <Twitter className="h-8 w-8" />
                            </div>
                            <h3 className="text-[#00FFFF] text-xl font-bold mb-2">
                                Twitter
                            </h3>
                        </div>
                    </a>

                    <a
                        href={(siteData?.socials as any)?.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <div className="bg-[#000B1E] p-8 rounded-lg border border-[#00FFFF]/30 shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] group-hover:border-[#00FFFF]/60 group-hover:translate-y-[-5px]">
                            <div className="w-16 h-16 bg-[#001F3F] rounded-full flex items-center justify-center mx-auto mb-4 text-[#00FFFF] group-hover:text-[#FFFF00] transition-colors">
                                <MessageCircle className="h-8 w-8" />
                            </div>
                            <h3 className="text-[#00FFFF] text-xl font-bold mb-2">
                                Telegram
                            </h3>
                        </div>
                    </a>

                    <a
                        href={(siteData?.socials as any)?.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <div className="bg-[#000B1E] p-8 rounded-lg border border-[#00FFFF]/30 shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] group-hover:border-[#00FFFF]/60 group-hover:translate-y-[-5px]">
                            <div className="w-16 h-16 bg-[#001F3F] rounded-full flex items-center justify-center mx-auto mb-4 text-[#00FFFF] group-hover:text-[#FFFF00] transition-colors">
                                <Headphones className="h-8 w-8" />
                            </div>
                            <h3 className="text-[#00FFFF] text-xl font-bold mb-2">
                                Discord
                            </h3>
                        </div>
                    </a>
                </div>

                <div className="mt-16 text-white/60 text-sm">
                    <p>
                        © {new Date().getFullYear()} {siteData?.name} • All
                        Rights Reserved
                    </p>
                </div>
            </div>
        </section>
    );
}

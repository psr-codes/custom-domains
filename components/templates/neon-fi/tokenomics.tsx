"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Site } from "@prisma/client";

export default function Tokenomics({ siteData }: { siteData: Site | null }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(
                (siteData?.tokenomics as any)?.ca
            );
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <section
            id="tokenomics"
            className="min-h-screen flex items-center justify-center py-20 px-4"
        >
            <div className="max-w-4xl w-full bg-[#000B1E]/80 backdrop-blur-md p-8 rounded-lg border border-[#00FFFF]/30 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#00FFFF] mb-4 tracking-wider">
                        TOKENOMICS
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-[#FFFF00] text-lg mb-2">
                                Token Name
                            </h3>
                            <p className="text-white text-2xl font-bold">
                                {siteData?.name}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[#FFFF00] text-lg mb-2">
                                Ticker
                            </h3>
                            <p className="text-white text-2xl font-bold">
                                ${(siteData?.tokenomics as any)?.ticker}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[#FFFF00] text-lg mb-2">
                                Description
                            </h3>
                            <p className="text-white">
                                {siteData?.description}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-[#FFFF00] text-lg mb-2">
                                Contract Address
                            </h3>
                            <div className="flex items-center bg-[#001F3F] p-3 rounded-md border border-[#00FFFF]/30">
                                <code className="text-white text-sm flex-1 overflow-hidden overflow-ellipsis">
                                    {(siteData?.tokenomics as any)?.ca}
                                </code>
                                <button
                                    onClick={copyToClipboard}
                                    className="ml-2 cursor-pointer text-[#00FFFF] hover:text-[#00FF00] transition-colors"
                                    aria-label="Copy contract address"
                                >
                                    {copied ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <Copy className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {copied && (
                                <p className="text-[#00FF00] text-sm mt-1">
                                    Copied to clipboard!
                                </p>
                            )}
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={() =>
                                    window.open(
                                        (siteData?.tokenomics as any)?.buyLink,
                                        "_blank"
                                    )
                                }
                                className="cursor-pointer w-full bg-[#00FF00] hover:bg-[#00FFFF] text-black font-bold py-3 px-6 rounded-md transition-colors shadow-[0_0_15px_rgba(0,255,0,0.5)] flex items-center justify-center"
                            >
                                Buy {(siteData?.tokenomics as any)?.ticker}
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#001F3F] p-4 rounded-md border border-[#00FFFF]/30 text-center">
                        <h4 className="text-[#FFFF00] mb-2">
                            ownership renounced
                        </h4>
                        <p className="text-white text-xl font-bold">
                            Fuck Yeah
                        </p>
                    </div>
                    <div className="bg-[#001F3F] p-4 rounded-md border border-[#00FFFF]/30 text-center">
                        <h4 className="text-[#FFFF00] mb-2">burnt liquidity</h4>
                        <p className="text-white text-xl font-bold">Obv Bruh</p>
                    </div>
                    <div className="bg-[#001F3F] p-4 rounded-md border border-[#00FFFF]/30 text-center">
                        <h4 className="text-[#FFFF00] mb-2">Mintable</h4>
                        <p className="text-white text-xl font-bold">Nope</p>
                    </div>
                    <div className="bg-[#001F3F] p-4 rounded-md border border-[#00FFFF]/30 text-center">
                        <h4 className="text-[#FFFF00] mb-2">Tax</h4>
                        <p className="text-white text-xl font-bold">
                            What tax?
                        </p>
                    </div>

                    <div></div>
                </div>
            </div>
        </section>
    );
}

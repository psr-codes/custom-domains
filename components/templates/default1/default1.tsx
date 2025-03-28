"use client";
import { Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { sanitizeSocialUrl } from "@/lib/utils";
import { fetchSiteDataAction } from "@/lib/actions/actions";
import { Site } from "@prisma/client";

import { useState, useEffect } from "react";
import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { ArrowRight, Twitter, Menu, X } from "lucide-react";

export default function Home({ siteData }: { siteData: Site | null }) {
    const [showCopied, setShowCopied] = useState<boolean>(false);

    const contractAddress = (siteData?.tokenomics as any)?.ca;

    const copyAddress = (): void => {
        navigator.clipboard.writeText(contractAddress);
        setShowCopied(true);

        setTimeout(() => setShowCopied(false), 2000);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (!siteData) return <p> loading... </p>;

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Improved radial background - applied to the entire page */}
            <div className="fixed inset-0 bg-green-700 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.15)_0%,rgba(0,100,0,0.5)_70%)]"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(0,0,0,0.1) 51%, transparent 52%, transparent 100%), radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 60%)",
                        backgroundSize: "60px 60px, 100% 100%",
                    }}
                ></div>
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage:
                            "linear-gradient(0deg, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                ></div>
            </div>

            {/* Cyber-themed Navbar */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/20 border-b border-green-500/50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="relative h-10 w-10 mr-2">
                                <div className="absolute inset-0 bg-green-400 rounded-full opacity-70 animate-pulse"></div>
                                <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center text-green-400 font-bold">
                                    {/* {siteData.ticker.charAt(0)} */}
                                    <Image
                                        src={siteData?.logoUrl}
                                        width={40}
                                        height={40}
                                        alt={siteData?.subdomain}
                                    ></Image>
                                </div>
                            </div>
                            <span
                                className="text-xl font-bold text-white"
                                style={{
                                    fontFamily: "monospace",
                                    textShadow:
                                        "0 0 5px #00ff00, 0 0 10px #00ff00",
                                }}
                            >
                                {siteData.name}
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a
                                href="#home"
                                className="text-green-300 hover:text-white px-3 py-2 font-mono text-sm"
                            >
                                HOME
                            </a>
                            <a
                                href="#tokenomics"
                                className="text-green-300 hover:text-white px-3 py-2 font-mono text-sm"
                            >
                                TOKENOMICS
                            </a>
                            <a
                                href="#community"
                                className="text-green-300 hover:text-white px-3 py-2 font-mono text-sm"
                            >
                                COMMUNITY
                            </a>
                            <button
                                className="ml-4 cursor-pointer bg-green-500 hover:bg-green-600 text-black border border-green-300 px-4 py-1 rounded font-mono text-sm"
                                onClick={() =>
                                    window.open(
                                        sanitizeSocialUrl(
                                            (siteData?.tokenomics as any)
                                                ?.buyLink
                                        ) || "#",
                                        "_blank"
                                    )
                                }
                            >
                                BUY NOW
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-green-300 hover:text-white focus:outline-none"
                            >
                                {isMenuOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden py-2 border-t border-green-500/30">
                            <a
                                href="#home"
                                className="block text-green-300 hover:text-white px-3 py-2 font-mono text-sm"
                            >
                                HOME
                            </a>
                            <a
                                href="#tokenomics"
                                className="block text-green-300 hover:text-white px-3 py-2 font-mono text-sm"
                            >
                                TOKENOMICS
                            </a>
                            <a
                                href="#community"
                                className="block text-green-300 hover:text-white px-3 py-2 font-mono text-sm"
                            >
                                COMMUNITY
                            </a>
                            <div className="px-3 py-2">
                                <button
                                    className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-black border border-green-300 px-4 py-1 rounded font-mono text-sm"
                                    onClick={() =>
                                        window.open(
                                            sanitizeSocialUrl(
                                                (siteData?.tokenomics as any)
                                                    ?.buyLink
                                            ) || "#",
                                            "_blank"
                                        )
                                    }
                                >
                                    BUY NOW
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* HOME SECTION */}
            <section
                id="home"
                className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-12 text-center "
            >
                {/* Coin mascot */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl"></div>
                    <Image
                        src={siteData?.logoUrl}
                        alt={siteData?.name}
                        width={200}
                        height={200}
                        className="relative z-10"
                    />
                    <div className="absolute -top-2 -right-2 bg-yellow-300 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold border-2 border-black z-20">
                        $
                    </div>
                </div>

                {/* Coin name */}
                <h1
                    className="text-5xl font-bold mb-4 text-white"
                    style={{
                        fontFamily: "monospace",
                        letterSpacing: "0.05em",
                        textShadow: "0 0 5px #00ff00, 0 0 10px #00ff00",
                    }}
                >
                    {siteData?.name}
                </h1>

                {/* Description */}
                <p
                    className="mb-8 text-green-100 max-w-xs mx-auto"
                    style={{ fontFamily: "monospace" }}
                >
                    {siteData.description}
                </p>

                {/* Action buttons */}
                <div className="flex gap-4">
                    <button
                        className="bg-green-500 cursor-pointer hover:bg-green-600 text-black border border-green-300 px-6 py-2 rounded-md font-bold"
                        onClick={() =>
                            window.open(
                                sanitizeSocialUrl(
                                    (siteData?.tokenomics as any)?.buyLink
                                ) || "#",
                                "_blank"
                            )
                        }
                    >
                        Buy Now!
                    </button>
                    <div className="flex-col relative">
                        <div
                            // variant="outline"
                            className="bg-black/30 flex gap-5 justify-between items-center hover:bg-black/50 text-green-300 border border-green-500 px-2 py-2 rounded-md font-bold"
                        >
                            <span>CA</span>
                            <button
                                onClick={copyAddress}
                                className="text-pink-600   cursor-pointer hover:text-pink-700 flex items-center"
                            >
                                <Copy className="w-4 h-4 mr-1" />
                                <span className="text-sm">Copy</span>
                            </button>{" "}
                        </div>{" "}
                        <p className="absolute">
                            {" "}
                            {showCopied && (
                                <span className="text-sm text-stone-50 block mt-1">
                                    Copied!
                                </span>
                            )}
                        </p>
                    </div>{" "}
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 animate-bounce">
                    <ArrowRight className="rotate-90 w-8 h-8 text-green-300" />
                </div>
            </section>

            {/* TOKENOMICS SECTION */}
            <section
                id="tokenomics"
                className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 pt-24"
            >
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 max-w-md w-full border border-green-500/50">
                    <h2
                        className="text-4xl font-bold mb-8 text-center text-white"
                        style={{
                            fontFamily: "monospace",
                            letterSpacing: "0.05em",
                            textShadow: "0 0 5px #00ff00, 0 0 10px #00ff00",
                        }}
                    >
                        Tokenomics
                    </h2>

                    <div className="grid gap-4 mb-8">
                        <div className="bg-black/40 rounded-lg p-4 border border-green-500/30">
                            <h3 className="text-sm font-bold text-green-300/70 mb-1">
                                Token Name
                            </h3>
                            <p className="text-xl font-mono font-bold text-green-100">
                                {siteData.name}
                            </p>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4 border border-green-500/30">
                            <h3 className="text-sm font-bold text-green-300/70 mb-1">
                                Ticker
                            </h3>
                            <p className="text-xl font-mono font-bold text-green-100">
                                {(siteData?.tokenomics as any)?.ticker}
                            </p>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4 border border-green-500/30">
                            <h3 className="text-sm font-bold text-green-300/70 mb-1">
                                Chain
                            </h3>
                            <p className="text-xl font-mono font-bold text-green-100">
                                {(siteData?.tokenomics as any)?.chain}
                            </p>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4 border border-green-500/30 break-all relative">
                            <div className="flex justify-between items-start">
                                <h3 className="text-sm font-bold text-green-300/70 mb-1">
                                    Contract Address
                                </h3>{" "}
                                <button
                                    onClick={copyAddress}
                                    className="text-pink-600   cursor-pointer hover:text-pink-700 flex items-center"
                                >
                                    <Copy className="w-4 h-4 mr-1" />
                                    <span className="text-sm">Copy</span>
                                </button>{" "}
                            </div>
                            <span className="text-sm   font-mono font-bold text-green-100">
                                {(siteData?.tokenomics as any)?.ca}
                            </span>{" "}
                            <span className="absolute right-2 bottom-2 text-pink-500">
                                {" "}
                                {showCopied && (
                                    <span className="text-sm text-stone-50 block mt-1">
                                        Copied!
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>

                    <button
                        className="w-full bg-green-500 cursor-pointer hover:bg-green-600 text-black border border-green-300 px-6 py-6 rounded-md font-bold text-xl"
                        onClick={() =>
                            window.open(
                                sanitizeSocialUrl(
                                    (siteData?.tokenomics as any)?.buyLink
                                ) || "#",
                                "_blank"
                            )
                        }
                    >
                        Buy {(siteData?.tokenomics as any)?.ticker} Now!
                    </button>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 animate-bounce">
                    <ArrowRight className="rotate-90 w-8 h-8 text-green-300" />
                </div>
            </section>

            {/* SOCIAL MEDIA SECTION */}
            <section
                id="community"
                className="relative z-10 flex flex-col items-center justify-center min-h-[50vh] px-4 py-12 pt-24"
            >
                <h2
                    className="text-4xl font-bold mb-12 text-center text-white"
                    style={{
                        fontFamily: "monospace",
                        letterSpacing: "0.05em",
                        textShadow: "0 0 5px #00ff00, 0 0 10px #00ff00",
                    }}
                >
                    Join Our Community
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
                    {/* Twitter */}
                    <Link
                        href={sanitizeSocialUrl(
                            (siteData?.socials as any).twitter
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center bg-black/30 hover:bg-black/50 text-green-300 p-8 rounded-md transition-transform hover:scale-105 border border-green-500/50"
                    >
                        <Twitter size={48} className="mb-4" />
                        <span className="text-xl font-bold font-mono">
                            Twitter
                        </span>
                    </Link>

                    {/* Discord */}
                    <Link
                        href={sanitizeSocialUrl(
                            (siteData?.socials as any).discord
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center bg-black/30 hover:bg-black/50 text-green-300 p-8 rounded-md transition-transform hover:scale-105 border border-green-500/50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-4"
                        >
                            <circle cx="9" cy="12" r="1"></circle>
                            <circle cx="15" cy="12" r="1"></circle>
                            <path d="M7.5 7.5c3.5-1 5.5-1 9 0"></path>
                            <path d="M7 16.5c3.5 1 6.5 1 10 0"></path>
                            <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5"></path>
                            <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.48-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5"></path>
                        </svg>
                        <span className="text-xl font-bold font-mono">
                            Discord
                        </span>
                    </Link>

                    {/* Telegram */}
                    <Link
                        href={sanitizeSocialUrl(
                            (siteData?.socials as any).telegram
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center bg-black/30 hover:bg-black/50 text-green-300 p-8 rounded-md transition-transform hover:scale-105 border border-green-500/50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-4"
                        >
                            <path d="m22 2-7 20-4-9-9-4Z"></path>
                            <path d="M22 2 11 13"></path>
                        </svg>
                        <span className="text-xl font-bold font-mono">
                            Telegram
                        </span>
                    </Link>
                </div>

                <footer className="mt-16 text-center text-green-200/70">
                    <p className="font-mono">
                        © {new Date().getFullYear()} {siteData.name}. All rights
                        reserved.
                    </p>
                    <p className="font-mono text-sm mt-2">
                        Not financial advice. DYOR.
                    </p>
                </footer>
            </section>
        </div>
    );
}

export function CoinMascot() {
    return (
        <div className="relative">
            <div className="relative w-[150px] h-[150px]">
                <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Coin Mascot"
                    width={150}
                    height={150}
                    className="relative z-10"
                />
                <div className="absolute -top-2 -right-2 bg-yellow-300 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold border-2 border-black z-20">
                    $
                </div>
            </div>
        </div>
    );
}

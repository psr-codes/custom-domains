"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
// import { button } from "@/components/ui/button";
import { ArrowRight, Twitter, Menu, X } from "lucide-react";

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // This data would be fetched from your server
    // Replace this with your actual data fetching logic
    const [coinData, setCoinData] = useState({
        name: "YourCoin",
        ticker: "YRC",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
        price: "$0.00042069",
        marketCap: "$420,690",
        chain: "Ethereum",
        contractAddress: "0x1234...5678",
        buyLink: "https://uniswap.org",
        chartLink: "https://dextools.io",
        socials: {
            twitter: "https://twitter.com/yourcoin",
            discord: "https://discord.gg/yourcoin",
            telegram: "https://t.me/yourcoin",
        },
    });

    // Simulate data fetching
    useEffect(() => {
        // This would be your actual data fetching function
        // const fetchData = async () => {
        //   const response = await fetch('/api/coin-data');
        //   const data = await response.json();
        //   setCoinData(data);
        // };
        // fetchData();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
                                    {coinData.ticker.charAt(0)}
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
                                {coinData.name}
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
                                className="ml-4 bg-green-500 hover:bg-green-600 text-black border border-green-300 px-4 py-1 rounded font-mono text-sm"
                                onClick={() =>
                                    window.open(coinData.buyLink, "_blank")
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
                                    className="w-full bg-green-500 hover:bg-green-600 text-black border border-green-300 px-4 py-1 rounded font-mono text-sm"
                                    onClick={() =>
                                        window.open(coinData.buyLink, "_blank")
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
                className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center pt-24"
            >
                {/* Coin mascot */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl"></div>
                    <Image
                        src="/logo.png"
                        alt="Coin Mascot"
                        width={150}
                        height={150}
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
                    {coinData.name}
                </h1>

                {/* Description */}
                <p
                    className="mb-8 text-green-100 max-w-xs mx-auto"
                    style={{ fontFamily: "monospace" }}
                >
                    {coinData.description}
                </p>

                {/* Action buttons */}
                <div className="flex gap-4">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-black border border-green-300 px-6 py-2 rounded-md font-bold"
                        onClick={() => window.open(coinData.buyLink, "_blank")}
                    >
                        Buy Now!
                    </button>
                    <button
                        // variant="outline"
                        className="bg-black/30 hover:bg-black/50 text-green-300 border border-green-500 px-6 py-2 rounded-md font-bold"
                        onClick={() =>
                            window.open(coinData.chartLink, "_blank")
                        }
                    >
                        View Chart
                    </button>
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
                                {coinData.name}
                            </p>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4 border border-green-500/30">
                            <h3 className="text-sm font-bold text-green-300/70 mb-1">
                                Ticker
                            </h3>
                            <p className="text-xl font-mono font-bold text-green-100">
                                {coinData.ticker}
                            </p>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4 border border-green-500/30">
                            <h3 className="text-sm font-bold text-green-300/70 mb-1">
                                Chain
                            </h3>
                            <p className="text-xl font-mono font-bold text-green-100">
                                {coinData.chain}
                            </p>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4 border border-green-500/30">
                            <h3 className="text-sm font-bold text-green-300/70 mb-1">
                                Price
                            </h3>
                            <p className="text-xl font-mono font-bold text-green-100">
                                {coinData.price}
                            </p>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4 border border-green-500/30">
                            <h3 className="text-sm font-bold text-green-300/70 mb-1">
                                Market Cap
                            </h3>
                            <p className="text-xl font-mono font-bold text-green-100">
                                {coinData.marketCap}
                            </p>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4 border border-green-500/30 break-all">
                            <h3 className="text-sm font-bold text-green-300/70 mb-1">
                                Contract Address
                            </h3>
                            <p className="text-md font-mono font-bold text-green-100">
                                {coinData.contractAddress}
                            </p>
                        </div>
                    </div>

                    <button
                        className="w-full bg-green-500 hover:bg-green-600 text-black border border-green-300 px-6 py-6 rounded-md font-bold text-xl"
                        onClick={() => window.open(coinData.buyLink, "_blank")}
                    >
                        Buy {coinData.ticker} Now!
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
                    <a
                        href={coinData.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center bg-black/30 hover:bg-black/50 text-green-300 p-8 rounded-md transition-transform hover:scale-105 border border-green-500/50"
                    >
                        <Twitter size={48} className="mb-4" />
                        <span className="text-xl font-bold font-mono">
                            Twitter
                        </span>
                    </a>

                    {/* Discord */}
                    <a
                        href={coinData.socials.discord}
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
                    </a>

                    {/* Telegram */}
                    <a
                        href={coinData.socials.telegram}
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
                    </a>
                </div>

                <footer className="mt-16 text-center text-green-200/70">
                    <p className="font-mono">
                        © {new Date().getFullYear()} {coinData.name}. All rights
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

// @tailwind base;
// @tailwind components;
// @tailwind utilities;

// @layer base {
//   :root {
//     --background: 0 0% 100%;
//     --foreground: 222.2 84% 4.9%;
//     --card: 0 0% 100%;
//     --card-foreground: 222.2 84% 4.9%;
//     --popover: 0 0% 100%;
//     --popover-foreground: 222.2 84% 4.9%;
//     --primary: 142.1 76.2% 36.3%;
//     --primary-foreground: 355.7 100% 97.3%;
//     --secondary: 142.1 76.2% 36.3%;
//     --secondary-foreground: 355.7 100% 97.3%;
//     --muted: 210 40% 96.1%;
//     --muted-foreground: 215.4 16.3% 46.9%;
//     --accent: 210 40% 96.1%;
//     --accent-foreground: 222.2 47.4% 11.2%;
//     --destructive: 0 84.2% 60.2%;
//     --destructive-foreground: 210 40% 98%;
//     --border: 214.3 31.8% 91.4%;
//     --input: 214.3 31.8% 91.4%;
//     --ring: 142.1 76.2% 36.3%;
//     --radius: 0.5rem;
//   }
// }

// @layer base {
//   * {
//     @apply border-border;
//   }
//   body {
//     @apply bg-background text-foreground;
//   }
// }

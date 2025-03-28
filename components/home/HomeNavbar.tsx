"use client";
import Link from "next/link";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { Twitter, Send } from "lucide-react";
export default function HomeNavbar() {
    const { publicKey } = useWallet();

    return (
        <nav className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Memecoin Site Builder
                    </div>
                    <div className="flex space-x-4">
                        <Link
                            target="_blank"
                            href="https://twitter.com"
                            className="hover:text-purple-400 transition-colors"
                        >
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link
                            target="_blank"
                            href="https://discord.com"
                            className="hover:text-purple-400 transition-colors"
                        >
                            <Image
                                src="/discord2.png"
                                width={25}
                                height={25}
                                alt="discord"
                            ></Image>
                        </Link>
                        <Link
                            target="_blank"
                            href="https://telegram.org"
                            className="hover:text-purple-400 transition-colors"
                        >
                            <Send className="h-5 w-5" />
                        </Link>
                    </div>
                    <div className="pr-8 flex justify-between items-center gap-5">
                        {publicKey ? (
                            <Link
                                href="/dashboard"
                                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            ""
                        )}
                        <WalletMultiButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}

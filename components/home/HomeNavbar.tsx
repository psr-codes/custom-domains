"use client";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function HomeNavbar() {
    const { publicKey } = useWallet();

    return (
        <div
            className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono"
            role="navigation"
        >
            <div className="pl-8">
                <a href="/" className="pl-4">
                    Home
                </a>
            </div>
            <div className="pr-8">
                {publicKey ? (
                    <Link href="/dashboard" className="text-blue-600 underline">
                        dashboard
                    </Link>
                ) : (
                    ""
                )}
                <WalletMultiButton style={{}} />
            </div>
        </div>
    );
}

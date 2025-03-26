"use client";

import React, { useMemo, type ReactNode } from "react";
import dynamic from "next/dynamic";

import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

// Dynamically import the modal component with SSR disabled
const WalletModalProviderDynamic = dynamic(
    () =>
        import("@solana/wallet-adapter-react-ui").then(
            (mod) => mod.WalletModalProvider
        ),
    { ssr: false }
);

interface AppWalletProviderProps {
    children: ReactNode;
}

export default function AppWalletProvider({
    children,
}: AppWalletProviderProps) {
    // Memoize network configuration
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // Memoize wallets list with production-safe adapters
    const wallets = useMemo(
        () => [
            // new PhantomWalletAdapter(),
            // Add other production-ready wallets
            // new SolflareWalletAdapter(),
            // new BackpackWalletAdapter()
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                {/* Wrap in Suspense to prevent SSR hydration mismatch */}
                <WalletModalProviderDynamic>
                    {children}
                </WalletModalProviderDynamic>
            </WalletProvider>
        </ConnectionProvider>
    );
}

"use client";
import { ReactNode } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Wrapper({ children }: { children: ReactNode }) {
    const { publicKey } = useWallet();

    if (!publicKey) {
        return (
            <div className="flex items-center justify-center h-screen">
                <WalletMultiButton />
            </div>
        );
    }
    return (
        <div className="min-h-screen sm:pl-60  bg-black text-gray-300">
            {children}
        </div>
    );
}

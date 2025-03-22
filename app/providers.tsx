"use client";
import AppWalletProvider from "@/components/AppWalletProvider";

import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal/provider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ModalProvider>
            <Toaster className="dark:hidden" />
            <Toaster theme="dark" className="hidden dark:block" />
            <AppWalletProvider>{children}</AppWalletProvider>
        </ModalProvider>
    );
}

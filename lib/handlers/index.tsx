import { toast } from "sonner";

import {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
} from "@solana/web3.js";

export const processPayment = async (
    publicKey: PublicKey,
    connection: Connection,
    sendTransaction: any
) => {
    try {
        toast.info("Processing payment...");

        // 1. Create transaction
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(
                    process.env.NEXT_PUBLIC_RECIPEINT_SOLANA_ADDRESS as string
                ),
                lamports: 0.1 * 1e9, // 0.1 SOL in lamports (1 SOL = 1e9 lamports)
            })
        );

        toast.info("Please approve the payment of 0.1 SOL in your wallet...");

        // 2. Send transaction
        const signature = await sendTransaction(transaction, connection);

        toast.info("Confirming payment...");

        // 3. Confirm transaction
        const latestBlockHash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: signature,
        });

        toast.success(
            `Payment successful! Transaction signature: ${signature}`
        );
        return signature; // Payment successful
    } catch (error) {
        toast.error(
            `Payment failed: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
        return false; // Payment failed
    }
};

export const handleValidateForm = (
    formData: {
        name: string;
        subdomain: string;
        description: string;
        logo: string;
        socials: {
            twitter: string;
            discord: string;
            telegram: string;
        };
        tokenomics: {
            ticker: string;
            chain: string;

            ca: string;

            buyLink: string;
        };
    },
    publicKey: PublicKey
) => {
    if (!publicKey) {
        toast.error("Please connect your wallet first");
        return false;
    }
    if (!formData.name) {
        toast.error("Please enter a name for your site");
        return false;
    }
    if (!formData.logo) {
        toast.error("Please upload a logo for your site");
        return false;
    }

    if (!formData.subdomain) {
        toast.error("Please enter a subdomain for your site");
        return false;
    }

    if (!formData.description) {
        toast.error("Please enter a description for your site");
        return false;
    }

    if (!formData.tokenomics.ticker) {
        toast.error("Please enter a ticker for your token");
        return false;
    }
    if (!formData.tokenomics.chain) {
        toast.error("Please enter a chain for your token");
        return false;
    }
    if (!formData.tokenomics.ca) {
        toast.error("Please enter a contract address for your token");
        return false;
    }
    if (!formData.tokenomics.buyLink) {
        toast.error("Please enter a buy link for your token");
        return false;
    }

    if (!formData.logo) {
        toast.error("Please upload a logo first");
        return false;
    }

    return true;
};

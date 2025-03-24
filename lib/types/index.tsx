import { User, Transaction } from "@prisma/client";
export interface Tokenomics {
    ticker: string;
    chain: string;

    ca: string;

    buyLink: string;
}

export interface Socials {
    twitter?: string;
    discord?: string;
    telegram?: string;
}

export interface Site {
    id: string;
    subdomain: string;
    description: string;
    ownerWalletAddress: string;
    name: string;
    logoUrl: string;
    tokenomics: Tokenomics;
    socials: Socials;
    templateId: string;
    templateData: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    // Add relations if needed
    owner?: User;
    transactions?: Transaction[];
}

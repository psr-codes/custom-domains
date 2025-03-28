"use server";

import prisma from "@/lib/prisma"; // Your Prisma client instance
import { Site, User, Transaction } from "@prisma/client";

// ***************** create data ************************

export const createUserAction = async (userWalletAddress: string) => {
    try {
        let user = await prisma.user.findUnique({
            where: { walletAddress: userWalletAddress },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    walletAddress: userWalletAddress,
                },
            });
            console.log("new user crated");
        }

        return user;
    } catch (error) {
        console.log("Error creating user:", error);
        throw new Error("Failed to create user");
    }
};

export const createSiteAction = async (
    formData: {
        name: string;
        subdomain: string;
        description: string;
        logo: string;
        templateId: string | null;
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
    userWalletAddress: string
) => {
    try {
        const site = await prisma.site.create({
            data: {
                name: formData.name,
                subdomain: formData.subdomain,
                description: formData.description,
                logoUrl: formData.logo,
                socials: formData.socials, // Store as JSON
                tokenomics: formData.tokenomics, // Store as JSON
                templateId: formData.templateId || "default1", // Default template ID
                templateData: {}, // Default empty JSON
                owner: {
                    connect: { walletAddress: userWalletAddress },
                },
            },
        });

        return site;
    } catch (error) {
        console.log("Error creating site:", error);
        throw new Error("Failed to create site");
    }
};

export const createTransactionAction = async (
    userWalletAddress: string,
    site: Site,
    signature: string // Add signature parameter
) => {
    try {
        const siteCreationFee = parseFloat(
            process.env.NEXT_PUBLIC_RECIPEINT_SITE_CREATION_FEE || "0.1"
        );

        return await prisma.transaction.create({
            data: {
                amount: siteCreationFee,
                status: "confirmed",
                txSignature: signature, // Use actual signature
                message: "Site creation payment",
                user: { connect: { walletAddress: userWalletAddress } },
                site: { connect: { id: site.id } },
            },
        });
    } catch (error) {
        console.log("Transaction creation failed:", error);
        throw new Error("Failed to record transaction");
    }
};

// ***************** fetch data ************************

export const fetchSiteDataAction = async (subdomain: string) => {
    try {
        return await prisma.site.findUnique({
            where: {
                subdomain: subdomain, // Replace with actual subdomain
            },
        });
    } catch (error) {
        console.log("Error fetching site data:", error);
        throw new Error("Failed to fetch site data");
    }
};

export const fetchAllSitesAction = async (userWalletAddress: string) => {
    try {
        const sites = await prisma.site.findMany({
            select: {
                // id: true,
                subdomain: true,
                description: true,
                name: true,
                logoUrl: true,
            },
        });

        return sites;
    } catch (error) {
        console.log("Error fetching all sites: ", error);
        throw new Error("failed to fetch site data");
    }
};

// ******************* update data *********************************
// lib/actions/actions.ts
export async function updateSiteAction(
    updateData: {
        id: string;
        name?: string;
        description?: string;
        logoUrl?: string;
        socials?: any;
        tokenomics?: any;
        templateId?: string;
        templateData?: any;
    },
    userWalletAddress: string
) {
    const { id, ...data } = updateData;

    const updated = await prisma.site.update({
        where: {
            id,
            ownerWalletAddress: userWalletAddress, // Ensures ownership
        },
        data: {
            ...data,
            socials: data.socials ? data.socials : undefined,
            tokenomics: data.tokenomics ? data.tokenomics : undefined,
        },
    });

    return updated;
}

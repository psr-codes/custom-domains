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
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
};

export const createSiteAction = async (
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
                templateId: "0", // Default template ID
                templateData: {}, // Default empty JSON
                owner: {
                    connect: { walletAddress: userWalletAddress },
                },
            },
        });

        return site;
    } catch (error) {
        console.error("Error creating site:", error);
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
        console.error("Transaction creation failed:", error);
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
        console.error("Error fetching site data:", error);
        throw new Error("Failed to fetch site data");
    }
};

// stores/site-store.ts
import { create } from "zustand";

// Type based on your Prisma model
type Site = {
    id: string;
    subdomain: string;
    description: string;
    ownerWalletAddress: string;
    name: string;
    logoUrl: string;
    tokenomics: any;
    socials: any;
    templateId: string;
    templateData: any;
    createdAt: Date;
    updatedAt: Date;
};

type SiteStore = {
    currentSiteData: Site | null;
    setCurrentSiteData: (data: Site | ((prev: Site | null) => Site)) => void;
};

export const useSiteStore = create<SiteStore>((set) => ({
    currentSiteData: null,
    setCurrentSiteData: (data) => {
        if (typeof data === "function") {
            set((state) => ({ currentSiteData: data(state.currentSiteData) }));
        } else {
            set({ currentSiteData: data });
        }
    },
}));

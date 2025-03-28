// stores/template-store.ts
import { create } from "zustand";

interface TemplateStore {
    selectedTemplateId: string | null;
    setSelectedTemplateId: (id: string | null) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
    selectedTemplateId: null,
    setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),
}));

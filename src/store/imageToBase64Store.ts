import { create } from "zustand";


export interface ImageToBase64Store {
    file: File | null;
    rawImage:string | null;
    setRawImage:(val:string)=>void;
    addFile: (v: File) => void;
    resetStore: () => void;
}

export const useImageToBase64Store = create<ImageToBase64Store>(
    (set, get) => ({
        file: null,
        rawImage:null,
        setRawImage:(rawImage)=>set({rawImage}),
        addFile: (file) => set({ file }),
        resetStore: () => set({ file: null })
    })
)
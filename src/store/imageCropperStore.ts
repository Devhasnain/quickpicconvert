import { create } from "zustand";


export interface ImageCropperStore {
    file: File | null
    imageElement: HTMLImageElement | null
    addFile: (f: File, iE: HTMLImageElement) => void;
    resetStore: () => void;
}

export const useImageCropperStore = create<ImageCropperStore>(
    (set, get) => ({
        file: null,
        imageElement: null,
        addFile: (file, imageElement) => set({ file, imageElement }),
        resetStore: () => set({ file: null })
    })
)
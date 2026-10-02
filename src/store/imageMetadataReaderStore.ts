import { create } from "zustand";


export interface ImageMetadataReader {
    file: File | null;
    imageMeta: any;
    setImageMeta:(meta:any)=>void;
    addFile: (v: File) => void;
    resetStore:()=>void;
}

export const useImageMetadataReader = create<ImageMetadataReader>(
    (set, get) => ({
        file: null,
        imageMeta:null,
        setImageMeta:(val:any)=>set({imageMeta:val}),
        addFile: (file) => set({file}),
        resetStore:()=>set({file:null})
    })
)
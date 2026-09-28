import { ImageToWebpResults } from "@/types";
import { create } from "zustand";


type SelectedFile = { file: File, id: string, output?: any }

export interface ImageWebpConverterStore {
    files: SelectedFile[] | [],
    setResults: (res: ImageToWebpResults[] | []) => void;
    addFiles: (v: SelectedFile[]) => void;
    removeFile: (i: string) => void;
    resetStore: () => void;
}

export const useImageWebpConverterStore = create<ImageWebpConverterStore>(
    (set, get) => ({
        files: [],
        setResults: (results) => {
            const files = get().files;
            const updatedFiles = files.map((cf) => {
                const cr = results.find((item) => item.id === cf.id);
                if (cf.id === cr?.id) return { ...cf, output: cr }
                return cf
            })
            set({ files: updatedFiles })
        },
        addFiles: (files) => {
            const eFs = get().files || [];
            if (eFs.length) set({ files: [...eFs, ...files] });
            set({ files })
        },
        removeFile: (i) => {
            const uFa = get().files?.filter((f) => f.id !== i) || [];
            set({ files: uFa })
        },
        resetStore: () => set({ files: [] })
    })
)
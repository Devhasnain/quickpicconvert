import { CompressedResult } from "@/types";
import { create } from "zustand";


type SelectedFile = { file: File, id: string, compressed?: CompressedResult }

export interface ImageCompressorStore {
    files: SelectedFile[] | [],
    setResults: (res: CompressedResult[] | []) => void;
    addFiles: (v: SelectedFile[]) => void;
    removeFile: (i: string) => void;
    resetStore: () => void;
}

export const useImageCompressorStore = create<ImageCompressorStore>(
    (set, get) => ({
        files: [],
        setResults: (results) => {
            const files = get().files;
            const updatedFiles = files.map((cf)=>{
                const cr = results.find((item)=>item.id === cf.id);
                if(cf.id === cr?.id) return {...cf,compressed:cr}
                return cf
            })
            set({files:updatedFiles})
        },
        addFiles: (files) => {
            const eFs = get().files || [];
            if (eFs.length) set({ files: [...eFs, ...files] });
            set({ files })
        },
        removeFile: (id) => {
            const uFa = get().files?.filter((i) => i.id !== id) || [];
            set({ files: uFa })
        },

        resetStore: () => set({ files: [] })
    })
)
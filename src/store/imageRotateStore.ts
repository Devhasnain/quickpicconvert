import { RotatedResult } from "@/types";
import { create } from "zustand";


type SelectedFile = { file: File, id: string, output?: RotatedResult }


export interface ImageRotateStore {
    rotate: number,
    files: SelectedFile[] | [],
    incrementRotate: (v: number) => void;
    decrementRotate: (v: number) => void;
    addFiles: (v: SelectedFile[]) => void;
    setResults: (res: RotatedResult[] | []) => void;
    removeFile: (i: string) => void;
    resetStore: () => void;
}

export const useImageRotateStore = create<ImageRotateStore>(
    (set, get) => ({
        files: [],
        rotate: 0,
        incrementRotate: (rotate) => set({ rotate }),
        decrementRotate: (rotate) => set({ rotate }),
        addFiles: (files) => {
            const eFs = get().files || [];
            if (eFs.length) set({ files: [...eFs, ...files] });
            set({ files })
        },
        setResults: (results) => {
            const files = get().files;
            const updatedFiles = files.map((cf)=>{
                const cr = results.find((item)=>item.id === cf.id);
                if(cf.id === cr?.id) return {...cf,output:cr}
                return cf
            })
            set({files:updatedFiles})
        },
        removeFile: (i) => {
            const uFa = get().files?.filter((f) => f.id !== i) || [];
            set({ files: uFa })
        },
        resetStore: () => set({ files: [], rotate:0 })
    })
)
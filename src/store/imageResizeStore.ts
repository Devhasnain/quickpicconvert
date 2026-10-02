import { getImageDimensions } from "@/lib/utils";
import { ResizedResult } from "@/types";
import { create } from "zustand";


type SelectedFile = {
    file: File, id: string, output?: ResizedResult
}

export type ResizeMode = "percentage" | "dimensions";

export interface ImageResizeStore {
    files: SelectedFile[] | [],
    mode: "percentage" | "dimensions",
    percentage: number;
    maintainAspectRatio: boolean,
    width: number,
    height: number,
    setResults: (res: ResizedResult[] | []) => void;
    setWidth: (v: number) => void;
    setHeight: (v: number) => void;
    setMaintainAspectRatio: (v: boolean) => void,
    setPercentage: (v: number) => void;
    setMode: (mode: ResizeMode) => void
    addFiles: (v: SelectedFile[]) => void;
    removeFile: (i: string) => void;
    resetStore: () => void;
}

export const useImageResizeStore = create<ImageResizeStore>(
    (set, get) => ({
        files: [],
        mode: "percentage",
        percentage: 50,
        maintainAspectRatio: true,
        width: 0,
        height: 0,
        setResults: (results) => {
            const files = get().files;
            const updatedFiles = files.map((cf) => {
                const cr = results.find((item) => item.id === cf.id);
                if (cf.id === cr?.id) return { ...cf, output: cr }
                return cf
            })
            set({ files: updatedFiles })
        },
        setWidth: (v) => set({ width: v }),
        setHeight: (v) => set({ height: v }),
        setMaintainAspectRatio: (v) => set({ maintainAspectRatio: v }),
        setPercentage: (v) => set({ percentage: v }),
        setMode: (mode) => set({ mode }),
        addFiles: async (files) => {
            const eFs = get().files || [];
            if (eFs.length) set({ files: [...eFs, ...files] });
            set({ files })
            if (files.length === 1) {
                const { width, height } = await getImageDimensions(files[0].file);
                set({ height, width });
            }

        },
        removeFile: (i) => {
            const uFa = get().files?.filter((f) => f.id !== i) || [];
            set({ files: uFa })
        },
        resetStore: () => set({ files: [] })
    })
)
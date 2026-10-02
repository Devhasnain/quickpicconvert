import { WatermarkItem } from "@/types";
import { create } from "zustand";


export interface ImageWatermarkStore {
    backgroundFile: File | null;
    backgroundImage: ImageBitmap | null;
    backgroundSettings: {
        width: number,
        height: number,
        scale: number
    },
    setBackground: ({ file, img, height, width, scale }: { file: File, img: ImageBitmap, height: number, width: number, scale: number }) => void

    waterMarks: WatermarkItem[] | [],
    selectedWmId: string | null;
    setSelectedWnId: (id: string | null) => void;
    addWaterMark: (wm: WatermarkItem) => void;
    updateWaterMarkSettings: (wm: WatermarkItem) => void
    removeWaterMark: (id: string) => void
    resetWaterMarks: () => void;
    setBackgroundScale:(val:any)=>void;
    rescaleWatermarks:(val:any)=>void
    // resetStore:()=>void;
}

export const useImageWatermarkStore = create<ImageWatermarkStore>(
    (set, get) => ({
        backgroundFile: null,
        backgroundImage: null,
        backgroundSettings: {
            height: 0,
            width: 0,
            scale: 1
        },

        waterMarks: [],
        selectedWmId: null,
        addWaterMark: (wm) => {
            const a = get().waterMarks || [];
            set({ waterMarks: [...a, wm], selectedWmId: wm.id })
        },
        updateWaterMarkSettings: (wm) => {
            const a = get()?.waterMarks?.map((item) => {
                if (item.id === wm.id) return wm
                return item
            });
            set({ waterMarks: a })
        },
        removeWaterMark: (id) => {
            const a = get().waterMarks?.filter((item) => item.id !== id);
            set({ waterMarks: a })
        },
        setSelectedWnId: (id) => set({ selectedWmId: id }),
        resetWaterMarks: () => set({ waterMarks: [] }),

        setBackground: ({ file, img, width, height, scale }) => {
            set({
                backgroundFile: file, backgroundImage: img,
                backgroundSettings: {
                    height,
                    width,
                    scale
                }
            })
        },
        setBackgroundScale: (scale: number) =>
            set((state) => ({
                backgroundSettings: { ...state.backgroundSettings, scale },
            })),

        rescaleWatermarks: (ratio: number) =>
            set((state) => ({
                waterMarks: state.waterMarks.map((wm) => ({
                    ...wm,
                    x: wm.x * ratio,
                    y: wm.y * ratio,
                    width: wm.width * ratio,
                    height: wm.height * ratio,
                })),
            })),
        // resetStore:()=>set({files:[]})
    })
)
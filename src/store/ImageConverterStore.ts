import { getDataUrlSize, loadImage } from "@/lib/utils";
import { create } from "zustand";
import { toast } from "sonner";


export type OutputFormats = "image/webp" | "image/jpeg" | "image/png";
export type FilterFormats =
    | "none"
    | "grayscale(100%)"
    | "contrast(120%)"
    | "brightness(120%)"
    | "sepia(100%)";

type CropArea = {
    x: number;
    y: number;
    width: number;
    height: number;
};

type ImageConverterStore = {

    fileName:string;

    crop: CropArea | null;
    rotation: 0 | 45 | 90 | 180 | 270;
    zoom: number;
    aspect: number | null;
    flipX: boolean;
    flipY: boolean;

    originalSize: number,
    outputSize: number,
    loading: boolean;

    // URLs (NOT HTMLImageElement)
    originalUrl: string | null;
    previewUrl: string | null;

    width: number | null;
    height: number | null;

    quality: number;
    outputFormat: OutputFormats;
    filter: FilterFormats;
    enableResize: boolean;

    setCrop: (crop: CropArea | null) => Promise<void>;
    setRotation: (r: 0 | 45 | 90 | 180 | 270) => Promise<void>;
    toggleFlipX: () => Promise<void>;
    toggleFlipY: () => Promise<void>;
    setOriginalSize: (originalSize: number) => void;
    setOutputSize: (outputSize: number) => void;
    setLoading: (v: boolean) => void;
    setOriginalImage: (url: string) => Promise<void>;
    setQuality: (q: number) => Promise<void>;
    setOutputFormat: (f: OutputFormats) => Promise<void>;
    setFilter: (f: FilterFormats) => Promise<void>;
    setWidth: (w: number | null) => Promise<void>;
    setHeight: (h: number | null) => Promise<void>;
    setEnableResize: (v: boolean) => void;
    processImage: () => void;
    resetToDefault: () => void;
    autoOptimizeForWeb: () => Promise<void>;
    setZoom: (z: number) => void;
    setAspect: (a: number | null) => void;
    setFileName:(a:string)=>void;
    resetStore:()=>void;
};

export const useImageConverterStore = create<ImageConverterStore>(
    (set, get) => ({
        fileName:'',
        crop: null,
        zoom: 0,
        aspect: 0,
        rotation: 0,
        flipX: false,
        flipY: false,


        originalSize: 0,
        outputSize: 0,
        loading: false,

        originalUrl: null,
        previewUrl: null,

        width: null,
        height: null,

        quality: 0.8,
        outputFormat: "image/webp",
        filter: "none",
        enableResize: false,

        setLoading: (loading) => set({ loading }),

        // ===============================
        // INTERNAL IMAGE PROCESSOR
        // ===============================
        async processImage() {
            const {
                originalUrl,
                width,
                height,
                quality,
                outputFormat,
                filter,
                crop,
                rotation,
                flipX,
                flipY,
            } = get();

            if (!originalUrl) return;

            try {
                set({ loading: true });

                const img = await loadImage(originalUrl);
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                if (!ctx) throw new Error("Canvas not supported");

                // ===== CROP SOURCE =====
                const sx = crop?.x ?? 0;
                const sy = crop?.y ?? 0;
                const sWidth = crop?.width ?? img.width;
                const sHeight = crop?.height ?? img.height;

                const targetWidth = width ?? sWidth;
                const targetHeight = height ?? sHeight;

                // ===== ROTATION SIZE FIX =====
                if (rotation === 90 || rotation === 270) {
                    canvas.width = targetHeight;
                    canvas.height = targetWidth;
                } else {
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.filter = filter === "none" ? "none" : filter;

                // ===== TRANSFORMS =====
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);

                // ===== DRAW IMAGE =====
                ctx.drawImage(
                    img,
                    sx,
                    sy,
                    sWidth,
                    sHeight,
                    -targetWidth / 2,
                    -targetHeight / 2,
                    targetWidth,
                    targetHeight
                );

                const dataUrl = canvas.toDataURL(outputFormat, quality);

                set({
                    previewUrl: dataUrl,
                    outputSize: getDataUrlSize(dataUrl),
                });
            } catch (err: any) {
                toast.error(err?.message || "Image processing failed");
            } finally {
                setTimeout(() => set({ loading: false }), 300);
            }
        },

        autoOptimizeForWeb: async () => {
            const { originalUrl } = get();
            if (!originalUrl) return;

            try {
                set({ loading: true });

                const img = await loadImage(originalUrl);

                const MAX_WIDTH = 1920;

                let targetWidth = img.width;
                let targetHeight = img.height;

                if (img.width > MAX_WIDTH) {
                    const ratio = img.height / img.width;
                    targetWidth = MAX_WIDTH;
                    targetHeight = Math.round(MAX_WIDTH * ratio);
                }

                set({
                    width: targetWidth,
                    height: targetHeight,
                    outputFormat: "image/webp",
                    quality: 0.75,
                    filter: "none",
                    enableResize: true,
                });

                await get().processImage();
            } catch (err: any) {
                toast.error(err?.message || "Auto optimization failed");
            } finally {
                set({ loading: false });
            }
        },


        // ===============================
        // PUBLIC ACTIONS
        // ===============================

        setCrop: async (crop) => {
            set({ crop });
            await get().processImage();
        },

        setRotation: async (rotation) => {
            set({ rotation });
            await get().processImage();
        },

        toggleFlipX: async () => {
            set((state) => ({ flipX: !state.flipX }));
            await get().processImage();
        },

        toggleFlipY: async () => {
            set((state) => ({ flipY: !state.flipY }));
            await get().processImage();
        },

        setAspect:(aspect)=>{
            set({aspect})
        },

        setZoom:(zoom)=>{
            set({zoom})
        },


        setOriginalSize: (originalSize) => set({ originalSize }),
        setOutputSize: (outputSize) => set({ outputSize }),

        resetToDefault: async () => {
            const { originalUrl } = get();
            if (!originalUrl) return;

            const img = await loadImage(originalUrl);

            set({
                previewUrl: originalUrl,
                width: img.width,
                height: img.height,
                filter: "none",
                outputFormat: "image/webp",
                quality: 0.8,
                crop: null,
                rotation: 0,
                flipX: false,
                flipY: false,
            });
        },

        resetStore: async () => {
            set({
                originalUrl:null,
                fileName:"",
                previewUrl: null,
                width: 0,
                height: 0,
                filter: "none",
                outputFormat: "image/webp",
                quality: 0.8,
                crop: null,
                rotation: 0,
                flipX: false,
                flipY: false,
            });
        },


        setOriginalImage: async (url) => {
            const img = await loadImage(url);

            set({
                originalUrl: url,
                previewUrl: url,
                width: img.width,
                height: img.height,
            });
        },

        setQuality: async (quality) => {
            set({ quality });
            await get().processImage();
        },

        setOutputFormat: async (outputFormat) => {
            set({ outputFormat });
            await get().processImage();
        },

        setFilter: async (filter) => {
            set({ filter });
            await get().processImage();
        },

        setWidth: async (width) => {
            set({ width });
            await get().processImage();
        },

        setHeight: async (height) => {
            set({ height });
            await get().processImage();
        },

        setEnableResize: (enableResize) => set({ enableResize }),
        setFileName:(fileName)=>set({fileName})
    })
);

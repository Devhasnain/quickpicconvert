import { ArrowRightLeft, Crop, FileImage, FileType, ImageMinus, Key, Layers, Maximize2, Minimize2, Palette, RotateCw, Wand2 } from "lucide-react";


export interface Tool {
    id: string;
    title: string;
    description: string;
    icon: typeof Key;
    //   href: string;
    category: string;
    keywords: string[];
    color: string;
    instructions?: {
        title: string;
        description: string;
        steps: { title: string; description: string }[];
        tips: string[];
        faqs: { question: string; answer: string }[];
    }
}

export const tools: Tool[] = [
    {
        "id": "jpg-to-png",
        "icon": ArrowRightLeft,
        "title": "JPG to PNG",
        "description": "Convert JPG images to PNG format with transparency support.",
        "category": "Converter",
        "color": "from-blue-500 to-cyan-500",
        "keywords": ["jpg to png", "convert jpg to png", "png transparency", "image converter"],
        "instructions": {
            "title": "Convert JPG to PNG Online",
            "description": "Easily convert JPG images into high-quality PNG format with transparency support.",
            "steps": [
                { "title": "Upload JPG", "description": "Select or drag and drop your JPG image." },
                { "title": "Convert", "description": "Click the convert button to start processing." },
                { "title": "Download PNG", "description": "Download the converted PNG file instantly." }
            ],
            "tips": [
                "PNG supports transparent backgrounds",
                "Use PNG for logos and icons",
                "PNG files are larger but lossless"
            ],
            "faqs": [
                { "question": "Does PNG support transparency?", "answer": "Yes, PNG allows transparent backgrounds." },
                { "question": "Is quality reduced?", "answer": "No, PNG conversion is lossless." }
            ]
        }
    },
    {
        "id": "png-to-jpg",
        "icon": ArrowRightLeft,
        "title": "PNG to JPG",
        "description": "Convert PNG images to JPG format for smaller file sizes.",
        "category": "Converter",
        "color": "from-orange-500 to-amber-500",
        "keywords": ["png to jpg", "convert png to jpg", "reduce image size", "jpg converter"],
        "instructions": {
            "title": "Convert PNG to JPG",
            "description": "Convert PNG images into JPG format to reduce file size.",
            "steps": [
                { "title": "Upload PNG", "description": "Choose your PNG image file." },
                { "title": "Convert", "description": "Start the PNG to JPG conversion." },
                { "title": "Download JPG", "description": "Download the optimized JPG image." }
            ],
            "tips": [
                "JPG is ideal for photos",
                "Transparency will be removed",
                "Smaller size improves website speed"
            ],
            "faqs": [
                { "question": "Does JPG support transparency?", "answer": "No, JPG does not support transparency." },
                { "question": "Is JPG good for websites?", "answer": "Yes, JPG loads faster due to smaller size." }
            ]
        }
    },
    {
        "id": "png-to-webp",
        "icon": ArrowRightLeft,
        "title": "PNG to WEBP",
        "description": "Convert PNG images to WebP format for better compression and faster web performance.",
        "category": "Converter",
        "color": "from-lime-500 to-green-500",
        "keywords": [
            "png to webp",
            "convert png to webp",
            "webp image converter",
            "optimize images for web"
        ],
        "instructions": {
            "title": "Convert PNG to WebP",
            "description": "Convert PNG images to WebP format to reduce file size while keeping high quality.",
            "steps": [
                { "title": "Upload PNG", "description": "Select or drag and drop your PNG image." },
                { "title": "Convert", "description": "Convert the PNG image to WebP format." },
                { "title": "Download WebP", "description": "Download the optimized WebP image." }
            ],
            "tips": [
                "WebP images load faster on websites",
                "Transparency is supported in WebP",
                "Ideal for modern web applications"
            ],
            "faqs": [
                {
                    "question": "Does WebP support transparency?",
                    "answer": "Yes, WebP supports transparent backgrounds like PNG."
                },
                {
                    "question": "Is WebP smaller than PNG?",
                    "answer": "Yes, WebP usually provides much smaller file sizes."
                }
            ]
        }
    },
    {
        "id": "jpg-to-webp",
        "icon": ArrowRightLeft,
        "title": "JPG to WebP",
        "description": "Convert JPG images to WebP format for smaller file size and improved performance.",
        "category": "Converter",
        "color": "from-sky-500 to-blue-500",
        "keywords": [
            "jpg to webp",
            "convert jpg to webp",
            "webp converter",
            "image optimization"
        ],
        "instructions": {
            "title": "Convert JPG to WebP",
            "description": "Convert JPG images into WebP format for faster loading and better compression.",
            "steps": [
                { "title": "Upload JPG", "description": "Choose your JPG image file." },
                { "title": "Convert", "description": "Process the image into WebP format." },
                { "title": "Download WebP", "description": "Download the converted WebP image." }
            ],
            "tips": [
                "WebP is ideal for photos and websites",
                "Maintains good visual quality",
                "Recommended for SEO and performance"
            ],
            "faqs": [
                {
                    "question": "Is WebP better than JPG?",
                    "answer": "Yes, WebP usually offers better compression with similar quality."
                },
                {
                    "question": "Do all browsers support WebP?",
                    "answer": "Most modern browsers support WebP."
                }
            ]
        }
    },
    {
        "id": "image-compressor",
        "icon": Minimize2,
        "title": "Image Compressor",
        "description": "Reduce image file size without losing quality.",
        "category": "Optimizer",
        "color": "from-purple-500 to-violet-500",
        "keywords": ["image compressor", "reduce image size", "optimize images", "seo images"],
        "instructions": {
            "title": "Compress Images Online",
            "description": "Reduce image file size while maintaining visual quality.",
            "steps": [
                { "title": "Upload Image", "description": "Select the image you want to compress." },
                { "title": "Compress", "description": "Apply smart compression." },
                { "title": "Download", "description": "Download the compressed image." }
            ],
            "tips": [
                "Optimized images improve SEO",
                "Great for faster websites",
                "Minimal quality loss"
            ],
            "faqs": [
                { "question": "Will compression affect quality?", "answer": "Very minimal and usually unnoticeable." },
                { "question": "Is compression safe?", "answer": "Yes, images are processed securely." }
            ]
        }
    },
    // {
    //     "id": "background-remover",
    //     "icon": ImageMinus,
    //     "title": "Background Remover",
    //     "description": "Remove backgrounds from images automatically.",
    //     "category": "AI Tool",
    //     "color": "from-violet-500 to-purple-500",
    //     "keywords": ["background remover", "remove image background", "ai background remover", "transparent image"],
    //     "instructions": {
    //         "title": "Remove Image Background",
    //         "description": "Automatically remove backgrounds using AI technology.",
    //         "steps": [
    //             { "title": "Upload Image", "description": "Upload an image with a visible subject." },
    //             { "title": "AI Processing", "description": "AI removes the background automatically." },
    //             { "title": "Download", "description": "Download the transparent image." }
    //         ],
    //         "tips": [
    //             "Best for product images",
    //             "Use high-contrast images",
    //             "Download as PNG for transparency"
    //         ],
    //         "faqs": [
    //             { "question": "Is this AI-powered?", "answer": "Yes, background removal uses AI." },
    //             { "question": "Do I need editing skills?", "answer": "No, it works automatically." }
    //         ]
    //     }
    // }
]



export const categories = [...new Set(tools.map((tool) => tool.category))];

import { ArrowRightLeft, Code, Crop, FileImage, FileText, FileType, ImageMinus, Key, Layers, Maximize2, Minimize2, Palette, RotateCw, Wand2 } from "lucide-react";


export interface Tool {
    id: string;
    title: string;
    description: string;
    icon: typeof Key;
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
    {
        id: "image-cropper",
        icon: Crop,
        title: "Image Cropper",
        description: "Crop images online to remove unwanted areas and adjust dimensions easily.",
        category: "Image Editing",
        color: "from-purple-500 to-violet-500",
        keywords: [
            "image cropper",
            "crop image online",
            "photo crop tool",
            "resize and crop images",
            "image editing tool"
        ],
        instructions: {
            title: "Crop Images Online",
            description:
                "Our Image Cropper lets you easily crop images online to remove unwanted areas, adjust composition, and resize images for social media, websites, or personal use. All processing happens directly in your browser for complete privacy.",
            steps: [
                {
                    title: "Upload Image",
                    description:
                        "Select or drag and drop the image you want to crop."
                },
                {
                    title: "Select Crop Area",
                    description:
                        "Adjust the crop area by dragging the corners or choose a fixed aspect ratio such as 1:1, 16:9, or 4:5."
                },
                {
                    title: "Apply Crop",
                    description:
                        "Click the crop button to apply the selected area to your image."
                },
                {
                    title: "Download Image",
                    description:
                        "Download the cropped image instantly in your selected format."
                }
            ],
            tips: [
                "Use fixed aspect ratios for social media posts and thumbnails.",
                "Crop unnecessary background to focus on the subject.",
                "High-resolution images produce better crop results.",
                "No images are uploaded — everything runs in your browser."
            ],
            faqs: [
                {
                    question: "Does cropping reduce image quality?",
                    answer:
                        "No, cropping does not reduce image quality. It only removes unwanted areas while keeping the original resolution of the selected area."
                },
                {
                    question: "Can I crop images for social media sizes?",
                    answer:
                        "Yes, you can crop images using common aspect ratios suitable for Instagram, Facebook, YouTube, and other platforms."
                },
                {
                    question: "Is this image cropper safe to use?",
                    answer:
                        "Absolutely. All image processing happens locally in your browser, and your images are never uploaded to any server."
                }
            ]
        }
    },
    {
        id: "image-to-text",
        icon: FileText,
        title: "Image to Text Converter",
        description: "Extract editable text from images using OCR technology.",
        category: "Utility",
        color: "from-blue-500 to-sky-500",
        keywords: [
            "image to text",
            "ocr image to text",
            "photo to text converter",
            "extract text from image",
            "image ocr online"
        ],
        instructions: {
            title: "Convert Image to Text Online",
            description:
                "Our Image to Text Converter uses Optical Character Recognition (OCR) to extract readable and editable text from images. It works directly in your browser, ensuring fast results and complete privacy.",
            steps: [
                {
                    title: "Upload Image",
                    description:
                        "Upload or drag and drop an image containing text such as a photo, screenshot, or scanned document."
                },
                {
                    title: "Process Image",
                    description:
                        "Click the convert button to analyze the image and extract text using OCR."
                },
                {
                    title: "Review Extracted Text",
                    description:
                        "Preview and edit the extracted text directly in the text editor."
                },
                {
                    title: "Copy or Download",
                    description:
                        "Copy the extracted text or download it as a text file for later use."
                }
            ],
            tips: [
                "Use clear and high-resolution images for better OCR accuracy.",
                "Ensure proper lighting and minimal blur in photos.",
                "Printed text is recognized more accurately than handwritten text.",
                "All processing happens locally for maximum privacy."
            ],
            faqs: [
                {
                    question: "What is OCR?",
                    answer:
                        "OCR (Optical Character Recognition) is a technology that converts text within images into editable and searchable text."
                },
                {
                    question: "Can this tool read handwritten text?",
                    answer:
                        "Basic OCR works best with printed text. Handwritten text recognition may work but accuracy can vary."
                },
                {
                    question: "Is my image uploaded to a server?",
                    answer:
                        "No. Images are processed locally in your browser and are never uploaded to any server."
                }
            ]
        }
    },
    {
        id: "image-to-base64",
        icon: Code,
        title: "Image to Base64 Converter",
        description: "Convert images into Base64 encoded strings instantly in your browser.",
        category: "Utility",
        color: "from-emerald-500 to-teal-500",
        keywords: [
            "image to base64",
            "base64 image encoder",
            "convert image to base64",
            "image to data url",
            "base64 image online"
        ],
        instructions: {
            title: "Convert Image to Base64 Online",
            description:
                "The Image to Base64 Converter encodes your images into Base64 strings or Data URLs. This is useful for embedding images directly into HTML, CSS, JSON, or API requests without external image files.",
            steps: [
                {
                    title: "Upload Image",
                    description:
                        "Upload or drag and drop an image file (PNG, JPG, JPEG, WebP)."
                },
                {
                    title: "Convert to Base64",
                    description:
                        "The image is instantly converted into a Base64 encoded string."
                },
                {
                    title: "Preview Result",
                    description:
                        "View the image preview and inspect the generated Base64 or Data URL."
                },
                {
                    title: "Copy or Download",
                    description:
                        "Copy the Base64 string or download it as a text file for later use."
                }
            ],
            tips: [
                "Base64 is useful for embedding small images directly in code.",
                "Avoid Base64 for large images as it increases file size.",
                "Great for API payloads and inline CSS backgrounds.",
                "All conversions run locally in your browser for privacy."
            ],
            faqs: [
                {
                    question: "What is Base64 encoding?",
                    answer:
                        "Base64 is a method of encoding binary data, such as images, into text so it can be safely used in code, JSON, or HTML."
                },
                {
                    question: "Does Base64 increase image size?",
                    answer:
                        "Yes. Base64 encoding increases file size by roughly 30%, so it’s best used for small images."
                },
                {
                    question: "Are my images uploaded to a server?",
                    answer:
                        "No. The conversion happens entirely in your browser and your images never leave your device."
                }
            ]
        }
    }


]



export const categories = [...new Set(tools.map((tool) => tool.category))];

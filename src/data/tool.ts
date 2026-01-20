import { ArrowRightLeft, Code, Crop, FileImage, FileText, FileType, ImageMinus, Info, Key, Layers, Maximize2, Minimize2, Palette, RotateCw, Wand2 } from "lucide-react";


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
        "id": "image-converter",
        "icon": ArrowRightLeft,
        "title": "Image Converter (JPG, PNG, WEBP)",
        "description": "Convert images between JPG, PNG, and WEBP formats online. Resize images, adjust quality, maintain transparency, and optimize files for web or print — fast, free, and secure.",
        "category": "Converter",
        "color": "from-purple-500 to-pink-500",
        "keywords": [
            "image converter",
            "jpg to png",
            "png to jpg",
            "jpg to webp",
            "png to webp",
            "webp to jpg",
            "webp to png",
            "convert images online",
            "free image converter",
            "resize images online",
            "image quality optimizer",
            "lossless image conversion",
            "image format converter"
        ],
        "instructions": {
            "title": "Convert Images Online (JPG, PNG, WEBP)",
            "description": "Our all-in-one image converter lets you easily convert images between JPG, PNG, and WEBP formats while controlling quality, dimensions, and output settings. Perfect for web optimization, design assets, social media, and professional use — all processed securely in your browser.",
            "steps": [
                {
                    "title": "Upload Your Image",
                    "description": "Upload or drag and drop your image in JPG, PNG, or WEBP format."
                },
                {
                    "title": "Choose Output Settings",
                    "description": "Select the output format (JPG, PNG, or WEBP), adjust image quality, and set custom width or height if needed."
                },
                {
                    "title": "Convert Image",
                    "description": "Click convert to instantly process your image using optimized and lossless conversion."
                },
                {
                    "title": "Download Converted Image",
                    "description": "Download your converted image immediately with the selected format, size, and quality."
                }
            ],
            "tips": [
                "Use WEBP for smaller file sizes and faster website loading",
                "Choose PNG for transparency and sharp graphics",
                "Adjust quality to reduce file size without visible loss",
                "Resize images to exact dimensions for web and social media",
                "Maintain original aspect ratio to avoid image distortion"
            ],
            "faqs": [
                {
                    "question": "Which image formats are supported?",
                    "answer": "This tool supports JPG, JPEG, PNG, and WEBP image formats for both input and output."
                },
                {
                    "question": "Can I resize images during conversion?",
                    "answer": "Yes, you can set a custom width or height, and the tool will resize the image while preserving aspect ratio."
                },
                {
                    "question": "Does this tool support transparency?",
                    "answer": "Yes, PNG and WEBP formats fully support transparency. JPG does not support transparent backgrounds."
                },
                {
                    "question": "Will image quality be reduced?",
                    "answer": "You control the quality settings. PNG uses lossless compression, while JPG and WEBP allow adjustable quality for optimization."
                },
                {
                    "question": "Is this image converter free and secure?",
                    "answer": "Yes, the converter is 100% free, runs entirely in your browser, and your images are never uploaded or stored on a server."
                }
            ]
        }
    }
    ,
    {
        "id": "jpg-to-png",
        "icon": ArrowRightLeft,
        "title": "JPG to PNG Converter",
        "description": "Convert JPG images to PNG format online with high quality and transparency support. Fast, free, and secure JPG to PNG conversion without losing image quality.",
        "category": "Converter",
        "color": "from-blue-500 to-cyan-500",
        "keywords": [
            "jpg to png",
            "convert jpg to png",
            "jpg to png online",
            "free jpg to png converter",
            "png transparency",
            "image format converter",
            "jpeg to png",
            "lossless image conversion"
        ],
        "instructions": {
            "title": "Convert JPG to PNG Online for Free",
            "description": "Our JPG to PNG converter allows you to easily convert JPEG images into high-quality PNG files with lossless compression. PNG format is ideal for transparent backgrounds, logos, icons, and professional graphics. The conversion is fast, secure, and works directly in your browser.",
            "steps": [
                {
                    "title": "Upload JPG Image",
                    "description": "Click the upload button or drag and drop your JPG or JPEG image into the converter."
                },
                {
                    "title": "Convert to PNG",
                    "description": "Start the conversion process with a single click. The tool instantly converts your JPG into PNG format."
                },
                {
                    "title": "Download PNG File",
                    "description": "Download your converted PNG image immediately with preserved quality and transparency support."
                }
            ],
            "tips": [
                "PNG supports transparent backgrounds, unlike JPG",
                "Use PNG format for logos, icons, and UI graphics",
                "PNG offers lossless compression with better quality",
                "PNG is ideal for images with text or sharp edges"
            ],
            "faqs": [
                {
                    "question": "Does PNG support transparent backgrounds?",
                    "answer": "Yes, PNG format fully supports transparency, making it ideal for logos and design elements."
                },
                {
                    "question": "Will my image quality be reduced after conversion?",
                    "answer": "No, PNG uses lossless compression, so the image quality remains intact."
                },
                {
                    "question": "Is this JPG to PNG converter free to use?",
                    "answer": "Yes, this tool is completely free with no hidden charges or watermarks."
                },
                {
                    "question": "Is my uploaded image safe?",
                    "answer": "Yes, all images are processed securely and are not stored on our servers."
                }
            ]
        }
    },
    {
        "id": "png-to-jpg",
        "icon": ArrowRightLeft,
        "title": "PNG to JPG Converter",
        "description": "Convert PNG images to JPG format online to reduce file size while maintaining excellent image quality. Fast, free, and browser-based PNG to JPG converter.",
        "category": "Converter",
        "color": "from-orange-500 to-amber-500",
        "keywords": [
            "png to jpg",
            "convert png to jpg",
            "png to jpg online",
            "reduce image size",
            "jpg image converter",
            "free png to jpg converter",
            "optimize images for web",
            "image compression tool"
        ],
        "instructions": {
            "title": "Convert PNG to JPG Online for Free",
            "description": "Our PNG to JPG converter helps you convert large PNG images into smaller JPG files without noticeable quality loss. JPG format is ideal for photos, websites, and faster page loading. The conversion happens instantly and securely in your browser.",
            "steps": [
                {
                    "title": "Upload PNG Image",
                    "description": "Select your PNG image or drag and drop it into the converter."
                },
                {
                    "title": "Convert to JPG",
                    "description": "Click the convert button to instantly transform your PNG into JPG format."
                },
                {
                    "title": "Download JPG Image",
                    "description": "Download the optimized JPG image with reduced file size and improved loading speed."
                }
            ],
            "tips": [
                "JPG format is ideal for photographs and web images",
                "Transparent areas in PNG will be replaced with a solid background",
                "Smaller JPG files improve website performance and SEO",
                "Use JPG for blogs, product images, and social media"
            ],
            "faqs": [
                {
                    "question": "Does JPG support transparency?",
                    "answer": "No, JPG format does not support transparency. Transparent areas will be filled with a background color."
                },
                {
                    "question": "Is JPG a good format for websites?",
                    "answer": "Yes, JPG images have smaller file sizes and load faster, making them ideal for websites."
                },
                {
                    "question": "Will converting PNG to JPG reduce image quality?",
                    "answer": "There may be slight compression, but the image remains visually high quality for most use cases."
                },
                {
                    "question": "Is this PNG to JPG converter free and safe?",
                    "answer": "Yes, this tool is completely free and processes images securely without storing them."
                }
            ]
        }
    },
    {
        "id": "png-to-webp",
        "icon": ArrowRightLeft,
        "title": "PNG to WebP Converter",
        "description": "Convert PNG images to WebP format online for superior compression, transparency support, and faster website performance without losing quality.",
        "category": "Converter",
        "color": "from-lime-500 to-green-500",
        "keywords": [
            "png to webp",
            "convert png to webp",
            "png to webp online",
            "webp image converter",
            "optimize images for web",
            "reduce png size",
            "modern image format"
        ],
        "instructions": {
            "title": "Convert PNG to WebP Online",
            "description": "The PNG to WebP converter helps you transform PNG images into modern WebP format, significantly reducing file size while preserving transparency and visual quality. WebP is ideal for faster websites, improved SEO, and better user experience.",
            "steps": [
                {
                    "title": "Upload PNG Image",
                    "description": "Select or drag and drop your PNG image into the converter."
                },
                {
                    "title": "Convert to WebP",
                    "description": "Click the convert button to process the PNG image into WebP format."
                },
                {
                    "title": "Download WebP Image",
                    "description": "Download the optimized WebP image instantly with reduced file size."
                }
            ],
            "tips": [
                "WebP images load faster than PNG on websites",
                "WebP supports transparency just like PNG",
                "Ideal for icons, UI elements, and web graphics",
                "Smaller images improve Core Web Vitals and SEO"
            ],
            "faqs": [
                {
                    "question": "Does WebP support transparency?",
                    "answer": "Yes, WebP fully supports transparent backgrounds similar to PNG."
                },
                {
                    "question": "Is WebP smaller than PNG?",
                    "answer": "Yes, WebP usually produces significantly smaller file sizes while maintaining quality."
                },
                {
                    "question": "Is WebP supported by browsers?",
                    "answer": "Yes, WebP is supported by all modern browsers including Chrome, Edge, Firefox, and Safari."
                }
            ]
        }
    },

    {
        "id": "jpg-to-webp",
        "icon": ArrowRightLeft,
        "title": "JPG to WebP Converter",
        "description": "Convert JPG images to WebP format online to achieve smaller file sizes, faster loading, and better image optimization for modern websites.",
        "category": "Converter",
        "color": "from-sky-500 to-blue-500",
        "keywords": [
            "jpg to webp",
            "convert jpg to webp",
            "jpg to webp online",
            "webp image converter",
            "image optimization",
            "reduce jpg size",
            "seo image optimization"
        ],
        "instructions": {
            "title": "Convert JPG to WebP Online",
            "description": "Our JPG to WebP converter allows you to convert JPEG images into WebP format for better compression and faster performance. WebP maintains excellent visual quality while significantly reducing file size.",
            "steps": [
                {
                    "title": "Upload JPG Image",
                    "description": "Choose or drag and drop your JPG or JPEG image file."
                },
                {
                    "title": "Convert to WebP",
                    "description": "Click the convert button to process the image into WebP format."
                },
                {
                    "title": "Download WebP Image",
                    "description": "Download the converted WebP image optimized for speed and performance."
                }
            ],
            "tips": [
                "WebP offers better compression than JPG",
                "Ideal for website images and blog posts",
                "Maintains good visual quality at smaller sizes",
                "Recommended for SEO and faster page loading"
            ],
            "faqs": [
                {
                    "question": "Is WebP better than JPG?",
                    "answer": "Yes, WebP generally provides smaller file sizes with similar or better visual quality."
                },
                {
                    "question": "Can I use WebP on my website?",
                    "answer": "Yes, most modern browsers fully support WebP images."
                },
                {
                    "question": "Will JPG to WebP reduce quality?",
                    "answer": "Minimal compression may occur, but quality remains visually excellent."
                }
            ]
        }
    },

    {
        "id": "image-compressor",
        "icon": Minimize2,
        "title": "Image Compressor",
        "description": "Compress images online to reduce file size while preserving visual quality. Perfect for SEO, faster websites, and optimized performance.",
        "category": "Optimizer",
        "color": "from-purple-500 to-violet-500",
        "keywords": [
            "image compressor",
            "reduce image size",
            "compress images online",
            "optimize images for web",
            "seo image optimization",
            "image size reducer"
        ],
        "instructions": {
            "title": "Compress Images Online",
            "description": "The Image Compressor reduces image file sizes without noticeable quality loss. Optimized images load faster, improve user experience, and boost SEO performance. Supports JPG, PNG, and WebP formats.",
            "steps": [
                {
                    "title": "Upload Image",
                    "description": "Select or drag and drop the image you want to compress."
                },
                {
                    "title": "Apply Compression",
                    "description": "The tool automatically applies smart compression to reduce file size."
                },
                {
                    "title": "Download Optimized Image",
                    "description": "Download the compressed image with improved loading speed."
                }
            ],
            "tips": [
                "Compressed images improve website speed and SEO",
                "Great for blogs, ecommerce, and landing pages",
                "Minimal quality loss with smart compression",
                "Use compression before uploading images to websites"
            ],
            "faqs": [
                {
                    "question": "Will image compression reduce quality?",
                    "answer": "Quality reduction is minimal and usually unnoticeable to the human eye."
                },
                {
                    "question": "Which formats are supported?",
                    "answer": "JPG, PNG, and WebP images are supported."
                },
                {
                    "question": "Is image compression safe?",
                    "answer": "Yes, all image processing happens securely and images are not stored."
                }
            ]
        }
    },

    {
        "id": "image-cropper",
        "icon": Crop,
        "title": "Image Cropper",
        "description": "Crop images online easily to remove unwanted areas, adjust dimensions, and create perfectly sized images for websites, social media, and designs.",
        "category": "Editor",
        "color": "from-purple-500 to-violet-500",
        "keywords": [
            "image cropper",
            "crop image online",
            "photo crop tool",
            "resize and crop images",
            "online image editor",
            "crop photos free",
            "image editing tool"
        ],
        "instructions": {
            "title": "Crop Images Online",
            "description": "Our Image Cropper lets you quickly crop images online to remove unwanted areas, adjust framing, and resize images for websites, social media, thumbnails, or personal use. All image processing is done locally in your browser to ensure privacy and speed.",
            "steps": [
                {
                    "title": "Upload Image",
                    "description": "Upload or drag and drop the image you want to crop."
                },
                {
                    "title": "Select Crop Area",
                    "description": "Adjust the crop area by dragging corners or choose preset aspect ratios like 1:1, 16:9, or 4:5."
                },
                {
                    "title": "Apply Crop",
                    "description": "Click the crop button to apply the selected area to your image."
                },
                {
                    "title": "Download Image",
                    "description": "Download the cropped image instantly in your preferred format."
                }
            ],
            "tips": [
                "Use aspect ratios for social media platforms like Instagram and YouTube",
                "Crop unnecessary background to focus on the subject",
                "High-resolution images produce better crop results",
                "No images are uploaded — everything runs in your browser"
            ],
            "faqs": [
                {
                    "question": "Does cropping reduce image quality?",
                    "answer": "No, cropping does not reduce image quality. It only removes unwanted areas while keeping the selected area at full resolution."
                },
                {
                    "question": "Can I crop images for social media sizes?",
                    "answer": "Yes, you can use preset aspect ratios suitable for Instagram, Facebook, YouTube, and other platforms."
                },
                {
                    "question": "Is this image cropper safe?",
                    "answer": "Yes, all image processing happens locally in your browser and your images are never uploaded to a server."
                }
            ]
        }
    },

    {
        "id": "image-to-text",
        "icon": FileText,
        "title": "Image to Text Converter",
        "description": "Extract editable and searchable text from images using advanced OCR technology. Convert photos, screenshots, and scanned documents to text online.",
        "category": "Utility",
        "color": "from-blue-500 to-sky-500",
        "keywords": [
            "image to text",
            "ocr image to text",
            "photo to text converter",
            "extract text from image",
            "image ocr online",
            "convert image to text",
            "ocr tool free"
        ],
        "instructions": {
            "title": "Convert Image to Text Online",
            "description": "Our Image to Text Converter uses Optical Character Recognition (OCR) to extract readable and editable text from images. It supports screenshots, scanned documents, and photos, and works directly in your browser for fast and private text extraction.",
            "steps": [
                {
                    "title": "Upload Image",
                    "description": "Upload or drag and drop an image containing text such as a photo, screenshot, or scanned document."
                },
                {
                    "title": "Extract Text",
                    "description": "Click the convert button to analyze the image and extract text using OCR technology."
                },
                {
                    "title": "Review Text",
                    "description": "Preview and edit the extracted text directly in the text editor."
                },
                {
                    "title": "Copy or Download",
                    "description": "Copy the extracted text or download it as a text file for later use."
                }
            ],
            "tips": [
                "Use clear, high-resolution images for better OCR accuracy",
                "Ensure text is properly aligned and well-lit",
                "Printed text gives better results than handwritten text",
                "All OCR processing happens locally for privacy"
            ],
            "faqs": [
                {
                    "question": "What is OCR?",
                    "answer": "OCR (Optical Character Recognition) is a technology that converts text within images into editable and searchable text."
                },
                {
                    "question": "Can this tool extract handwritten text?",
                    "answer": "OCR works best with printed text. Handwritten text may be recognized, but accuracy can vary."
                },
                {
                    "question": "Is my image uploaded to a server?",
                    "answer": "No. All image processing happens locally in your browser and images are never uploaded."
                }
            ]
        }
    },

    {
        "id": "image-to-base64",
        "icon": Code,
        "title": "Image to Base64 Converter",
        "description": "Convert images to Base64 encoded strings or Data URLs instantly. Encode PNG, JPG, JPEG, or WebP images directly in your browser without uploading files.",
        "category": "Utility",
        "color": "from-emerald-500 to-teal-500",
        "keywords": [
            "image to base64",
            "convert image to base64",
            "base64 image encoder",
            "image to data url",
            "base64 image online",
            "encode image base64",
            "base64 converter"
        ],
        "instructions": {
            "title": "Convert Image to Base64 Online",
            "description": "The Image to Base64 Converter encodes image files into Base64 strings or Data URLs that can be embedded directly into HTML, CSS, JSON, or API requests. This tool is especially useful for developers and designers who want to eliminate external image files. All conversions happen locally in your browser for privacy and speed.",
            "steps": [
                {
                    "title": "Upload Image",
                    "description": "Upload or drag and drop an image file such as PNG, JPG, JPEG, or WebP."
                },
                {
                    "title": "Convert to Base64",
                    "description": "The tool instantly encodes the image into a Base64 string or Data URL."
                },
                {
                    "title": "Preview Result",
                    "description": "Preview the image and inspect the generated Base64 output."
                },
                {
                    "title": "Copy or Download",
                    "description": "Copy the Base64 string to your clipboard or download it as a text file."
                }
            ],
            "tips": [
                "Base64 is useful for embedding small images directly into code",
                "Avoid using Base64 for large images due to increased size",
                "Great for API payloads, JSON responses, and inline CSS",
                "All encoding runs locally in your browser for full privacy"
            ],
            "faqs": [
                {
                    "question": "What is Base64 encoding?",
                    "answer": "Base64 encoding converts binary image data into text so it can be safely embedded in code, HTML, CSS, or JSON."
                },
                {
                    "question": "Does Base64 increase image size?",
                    "answer": "Yes, Base64 encoding increases file size by about 30%, so it’s best used for small images."
                },
                {
                    "question": "Which image formats are supported?",
                    "answer": "PNG, JPG, JPEG, and WebP image formats are supported."
                },
                {
                    "question": "Are my images uploaded to a server?",
                    "answer": "No. All image encoding happens locally in your browser and your images never leave your device."
                }
            ]
        }
    },

    {
        "id": "base64-to-image",
        "icon": Code,
        "title": "Base64 to Image Converter",
        "description": "Convert Base64 encoded strings back into image files instantly. Decode Base64 to PNG, JPG, or WebP directly in your browser.",
        "category": "Utility",
        "color": "from-rose-500 to-pink-500",
        "keywords": [
            "base64 to image",
            "decode base64 image",
            "base64 to png",
            "base64 to jpg",
            "base64 image decoder",
            "convert base64 to image online"
        ],
        "instructions": {
            "title": "Convert Base64 to Image Online",
            "description": "The Base64 to Image Converter allows you to decode Base64 strings or Data URLs back into real image files. This is useful for developers working with APIs, JSON responses, embedded images, or stored Base64 data. All decoding happens locally in your browser for maximum privacy.",
            "steps": [
                {
                    "title": "Paste Base64 String",
                    "description": "Paste your Base64 encoded string or Data URL into the input field."
                },
                {
                    "title": "Decode Image",
                    "description": "Click the convert button to decode the Base64 string into an image."
                },
                {
                    "title": "Preview Image",
                    "description": "Preview the decoded image directly in your browser."
                },
                {
                    "title": "Download Image",
                    "description": "Download the decoded image in PNG, JPG, or supported format."
                }
            ],
            "tips": [
                "Supports Base64 strings with or without Data URL prefixes",
                "Useful for debugging APIs and embedded images",
                "Ensure the Base64 string is complete and valid",
                "All decoding runs locally for security and privacy"
            ],
            "faqs": [
                {
                    "question": "What is Base64 to Image conversion?",
                    "answer": "It is the process of decoding a Base64 encoded string back into a usable image file."
                },
                {
                    "question": "Which image formats are supported?",
                    "answer": "PNG, JPG, JPEG, and WebP formats are supported depending on the encoded data."
                },
                {
                    "question": "Is my Base64 data uploaded anywhere?",
                    "answer": "No. All decoding happens directly in your browser and no data is sent to a server."
                }
            ]
        }
    },

    {
        "id": "image-metadata-reader",
        "icon": Info,
        "title": "Image Metadata Reader",
        "description": "View and analyze image metadata including EXIF data, camera details, resolution, and file information instantly online.",
        "category": "Utility",
        "color": "from-indigo-500 to-purple-500",
        "keywords": [
            "image metadata reader",
            "exif data viewer",
            "photo metadata online",
            "image exif viewer",
            "image information tool",
            "read image metadata"
        ],
        "instructions": {
            "title": "Read Image Metadata Online",
            "description": "The Image Metadata Reader lets you inspect hidden information stored inside image files, such as EXIF data, camera model, resolution, orientation, creation date, and more. This tool is useful for photographers, developers, and SEO professionals.",
            "steps": [
                {
                    "title": "Upload Image",
                    "description": "Upload or drag and drop an image file (JPG, PNG, WebP)."
                },
                {
                    "title": "Analyze Metadata",
                    "description": "The tool instantly scans the image and extracts available metadata."
                },
                {
                    "title": "View Details",
                    "description": "Review EXIF data such as camera info, dimensions, file size, and timestamps."
                }
            ],
            "tips": [
                "JPG images usually contain the most EXIF data",
                "Metadata may include camera model, ISO, and exposure",
                "Some images may not contain metadata if stripped",
                "All analysis happens locally for privacy"
            ],
            "faqs": [
                {
                    "question": "What is image metadata?",
                    "answer": "Image metadata is hidden information stored inside image files, including camera details, resolution, date, and settings."
                },
                {
                    "question": "Does every image contain EXIF data?",
                    "answer": "No. Metadata may be missing if the image was edited, compressed, or intentionally stripped."
                },
                {
                    "question": "Are my images uploaded to a server?",
                    "answer": "No. The metadata is read locally in your browser and images never leave your device."
                }
            ]
        }
    }




]



export const categories = [...new Set(tools.map((tool) => tool.category))];

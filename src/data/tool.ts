import { ArrowRightLeft, Code, Crop, FileImage, FileText, Info, Key, Minimize2, Palette } from "lucide-react";


export interface Tool {
    id: string;
    title: string;
    description: string;
    icon: typeof Key;
    category: string;
    color: string;
    instructions: {
        title: string;
        description: string;
        steps: { title: string; description: string }[];
        tips: string[];
        faqs: { question: string; answer: string }[];
    },
    seo: {
        title: string;
        description: string;
        canonical: string;
        keywords: string
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
        seo: {
            "title": "Free Online Image Converter – Convert | Resize & Optimize Images",
            "description": "Convert images online between JPG, PNG, and WEBP formats. Resize, compress, and optimize images instantly with our free, secure, and browser-based image converter.",
            "canonical": "https://quickpicconvert.com/tools/image-converter",
            "keywords": "free image converter online, convert jpg to png, convert png to jpg, convert jpg to webp, webp to png converter, resize images online, compress images, optimize image quality, online image editor"
        },
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
    },
    {
        "id": "jpg-to-png",
        "icon": ArrowRightLeft,
        "title": "JPG to PNG Converter",
        "description": "Convert JPG images to PNG format online with high quality and transparency support. Fast, free, and secure JPG to PNG conversion without losing image quality.",
        "category": "Converter",
        "color": "from-blue-500 to-cyan-500",
        seo: {
            "title": "JPG to PNG Converter – Convert JPG Images to PNG Online Free",
            "description": "Convert JPG images to PNG format online for free. Fast, secure, and browser-based JPG to PNG converter with no uploads required.",
            "canonical": "https://quickpicconvert.com/tools/jpg-to-png",
            "keywords": "jpg to png, convert jpg to png, jpg png converter, image format converter, online jpg to png"
        },
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
        seo: {
            title: "PNG to JPG Converter",
            "description": "Convert PNG images to JPG format online to reduce file size while maintaining excellent image quality. Fast, free, and browser-based PNG to JPG converter.",
            "keywords": "png to jpg, convert png to jpg, png to jpg online, reduce image size, jpg image converter, free png to jpg converter, optimize images for web, image compression tool",
            canonical: "https://quickpicconvert.com/tools/png-to-jpg"
        },
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
        seo: {
            "title": "PNG to WebP Converter",
            "description": "Convert PNG images to WebP format online for superior compression, transparency support, and faster website performance without losing quality.",
            canonical: "https://quickpicconvert.com/tools/png-to-webp",
            "keywords": "png to webp, convert png to webp, png to webp online, webp image converter, optimize images for web, reduce png size, modern image format"
        },

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
        "seo": {
            "title": "Image to Base64 Converter – Encode Images Online",
            "description": "Convert images to Base64 strings or Data URLs instantly. Perfect for developers embedding images into HTML, CSS, JSON, or APIs.",
            "canonical": "https://quickpicconvert.com/tools/image-to-base64",
            "keywords": "image to base64, convert image to base64, base64 image encoder, image to data url"
        },
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
        seo: {
            "title": "Image Compressor – Compress JPG, PNG & WEBP Images Online",
            "description": "Compress images online without losing quality. Reduce JPG, PNG, and WEBP file sizes instantly using our fast browser-based image compressor.",
            "canonical": "https://quickpicconvert.com/tools/image-compressor",
            "keywords": "image compressor, compress images, reduce image size, jpg png compressor, online image optimization"
        },
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
        seo: {
            "title": "Image Cropper",
            "description": "Crop images online easily to remove unwanted areas, adjust dimensions, and create perfectly sized images for websites, social media, and designs.",
            canonical: "https://quickpicconvert.com/tools/image-cropper",
            "keywords":
                "image cropper, crop image online, photo crop tool, resize and crop images, online image editor, crop photos free, image editing tool"
        },

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
        seo: {
            "title": "Image to Text Converter – Extract Text from Images Online (OCR)",
            "description": "Convert images to editable text online using OCR. Extract text from photos, screenshots, and scanned documents securely in your browser.",
            "canonical": "https://quickpicconvert.com/tools/image-to-text",
            "keywords": "image to text, ocr image to text, extract text from image, photo to text, image ocr online"
        },
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
        seo: {
            "title": "Image to Base64 Converter",
            "description": "Convert images to Base64 encoded strings or Data URLs instantly. Encode PNG, JPG, JPEG, or WebP images directly in your browser without uploading files.",
            "keywords":
                "image to base64, convert image to base64, base64 image encoder, image to data url, base64 image online, encode image base64, base64 converter",
            canonical: "https://quickpicconvert.com/tools/image-to-base64"
        },

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
        seo: {
            "title": "Base64 to Image Converter",
            "description": "Convert Base64 encoded strings back into image files instantly. Decode Base64 to PNG, JPG, or WebP directly in your browser.",
            "keywords": "base64 to image, decode base64 image, base64 to png, base64 to jpg, base64 image decoder, convert base64 to image online",
            canonical: "https://quickpicconvert.com/tools/base64-to-image",
        },

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
        seo: {
            "title": "Image Metadata Reader",
            "description": "View and analyze image metadata including EXIF data, camera details, resolution, and file information instantly online.",
            canonical: "https://quickpicconvert.com/tools/image-metadata-reader",
            "keywords": "image metadata reader, exif data viewer, photo metadata online, image exif viewer, image information tool, read image metadata"
        },

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
    },
    {
        id: "image-color-picker",
        icon: Palette, // replace with your imported icon if you have one
        title: "Image Color Picker",
        description: "Pick any color from your images instantly! Upload an image and click on any pixel to get its exact RGB or Hex value. Perfect for designers, developers, and creators.",
        color: "from-indigo-500 to-purple-500",
        category: "Utilities",
        seo: {
            title: "Image Color Picker",
            description: "Use Quick Pic Convert's Image Color Picker tool to instantly get RGB and Hex values from any image. Perfect for designers and developers.",
            canonical: "https://quickpicconvert.com/tools/image-color-picker",
            keywords: "image color picker, pick color from image, rgb color, hex color, online color picker, quick pic convert, image tools"
        },

        instructions: {
            title: "Image Color Picker Tool",
            description:
                "Quick Pic Convert's Image Color Picker allows you to upload any image and select a pixel to get its color in RGB or Hex format instantly. Ideal for designers, developers, and anyone working with colors.",
            steps: [
                {
                    title: "Upload Your Image",
                    description: "Click the upload button to select your image from your computer or device."
                },
                {
                    title: "Click on the Image",
                    description: "Click anywhere on the image to pick the color of that specific pixel."
                },
                {
                    title: "View Color Information",
                    description: "The tool will display the color in RGB and Hex formats, along with a preview swatch."
                },
                {
                    title: "Copy Color Code",
                    description: "Click the copy button to copy the RGB or Hex code for use in your design, website, or project."
                }
            ],
            tips: [
                "Use the tool for precise color selection from images.",
                "Copy Hex codes directly into your design software or CSS.",
                "For best accuracy, use high-resolution images.",
                "Combine with other Quick Pic Convert tools for advanced image editing."
            ],
            faqs: [
                {
                    question: "Can I pick colors from any image format?",
                    answer: "Yes! JPG, PNG, GIF, and most common image formats are supported."
                },
                {
                    question: "Is this tool free to use?",
                    answer: "Absolutely! The Image Color Picker is completely free and works directly in your browser."
                },
                {
                    question: "Can I use the copied color codes in my website?",
                    answer: "Yes. The RGB and Hex codes can be used in CSS, design tools, or any project that requires color specification."
                },
                {
                    question: "Does the image leave any trace or get uploaded to a server?",
                    answer: "No. All processing happens locally in your browser. No images are uploaded to our servers."
                }
            ]
        }
    },

    {
        id: "random-password-generator",
        icon: Key,
        title: "Random Password Generator",
        description: "Generate strong, secure, and random passwords online with custom length and character options. Free, fast, and 100% browser-based password generator.",
        "color": "from-rose-500 to-pink-500",
        category: "Security",
        seo: {
            title: "Random Password Generator",
            description: "Generate strong, secure, and random passwords online with custom length and character options. Free, fast, and 100% browser-based password generator.",
            canonical: "https://quickpicconvert.com/tools/random-password-generator",
            keywords: "random password generator, password generator, strong password generator, secure password, random password generator, online password generator, create strong passwords, free password generator, password security tool"
        },

        instructions: {
            title: "Strong Password Generator",
            description:
                "Our online password generator helps you create strong, random, and secure passwords to protect your accounts from hacking and data breaches. All passwords are generated locally in your browser for maximum privacy and security.",
            steps: [
                {
                    title: "Choose Password Length",
                    description:
                        "Use the slider to select your desired password length. For best security, we recommend a minimum of 16 characters."
                },
                {
                    title: "Select Character Types",
                    description:
                        "Include uppercase letters, lowercase letters, numbers, and symbols to increase password strength."
                },
                {
                    title: "Generate Secure Password",
                    description:
                        "Click the Generate button to instantly create a strong, random password based on your selected options."
                },
                {
                    title: "Copy & Use Anywhere",
                    description:
                        "Copy the generated password with one click and use it for websites, apps, or password managers."
                }
            ],
            tips: [
                "Use a unique password for every account.",
                "Passwords with 16–24 characters are significantly harder to crack.",
                "Always include symbols and numbers for maximum security.",
                "Store passwords in a trusted password manager instead of saving them in browsers."
            ],
            faqs: [
                {
                    question: "What is a strong password?",
                    answer:
                        "A strong password is long, random, and includes uppercase letters, lowercase letters, numbers, and symbols. It should not contain personal information or common words."
                },
                {
                    question: "Is this password generator safe to use?",
                    answer:
                        "Yes. All passwords are generated locally in your browser. No data is sent or stored on our servers."
                },
                {
                    question: "Can hackers crack generated passwords?",
                    answer:
                        "Strong, long, and random passwords generated by this tool are extremely difficult to crack using brute-force or dictionary attacks."
                },
                {
                    question: "How often should I generate new passwords?",
                    answer:
                        "Generate a new password whenever you create a new account or suspect a security breach. Avoid reusing old passwords."
                }
            ]
        }
    },

    {
        id: "image-to-pdf",
        icon: FileImage,
        title: "Image to PDF Converter",
        description: "Convert JPG and PNG images into a single PDF file online. Combine multiple images, control page size, orientation, and quality — fast, free, and fully browser-based.",
        category: "PDF Tools",
        color: "from-blue-500 to-cyan-500",
        seo: {
            title: "Image to PDF Converter – JPG to PDF, PNG to PDF Online Free",
            description: "Convert images to PDF online for free. Easily convert JPG to PDF or PNG to PDF, merge multiple images into one PDF, adjust page size and orientation — secure and browser-based.",
            canonical: "https://quickpicconvert.com/tools/image-to-pdf",
            keywords: "image to pdf, jpg to pdf, png to pdf, convert images to pdf online, jpg to pdf free, combine images into pdf, photos to pdf, image to pdf converter online, browser based pdf converter"
        },
        instructions: {
            title: "Convert Images to PDF Online",
            description: "Quick Pic Convert’s Image to PDF tool lets you convert JPG and PNG images into high-quality PDF files instantly. Combine multiple images into a single PDF, customize layout options, and export securely — all processed directly in your browser with no uploads.",
            steps: [
                {
                    title: "Upload Images",
                    description: "Upload or drag and drop one or multiple JPG or PNG images you want to convert into a PDF."
                },
                {
                    title: "Arrange & Customize",
                    description: "Reorder images, choose page size (A4, Letter, Auto), set orientation, and adjust margins or image fit."
                },
                {
                    title: "Convert to PDF",
                    description: "Click the convert button to instantly generate a PDF file from your images using browser-based processing."
                },
                {
                    title: "Download PDF",
                    description: "Download your final PDF file immediately — no watermark, no sign-up required."
                }
            ],
            tips: [
                "Upload multiple images to merge them into a single PDF file",
                "Use Auto page size for best image-to-page fitting",
                "Choose A4 or Letter for printing documents",
                "Reorder images before conversion to control page sequence",
                "All files are processed locally for maximum privacy"
            ],
            faqs: [
                {
                    question: "Which image formats are supported?",
                    answer: "This tool supports JPG, JPEG, and PNG image formats for converting images into PDF files."
                },
                {
                    question: "Can I convert multiple images into one PDF?",
                    answer: "Yes, you can upload multiple images and combine them into a single PDF file in your preferred order."
                },
                {
                    question: "Is this Image to PDF converter free?",
                    answer: "Yes, the tool is completely free to use with no watermarks or usage limits."
                },
                {
                    question: "Are my images uploaded to a server?",
                    answer: "No. All image-to-PDF conversions happen directly in your browser. Your files are never uploaded or stored."
                },
                {
                    question: "Can I use this tool on mobile devices?",
                    answer: "Yes, the Image to PDF converter works on desktop, tablet, and mobile browsers without installing any app."
                }
            ]
        }
    },

    {
        id: "jpg-to-pdf",
        icon: FileImage,
        title: "JPG to PDF Converter",
        description: "Convert JPG images to PDF online. Merge multiple JPG files into one PDF, adjust page size, margins, and orientation — fast, free, and browser-based.",
        category: "PDF Tools",
        color: "from-orange-500 to-red-500",
        seo: {
            title: "JPG to PDF Converter – Convert JPG Images to PDF Online Free",
            description: "Convert JPG to PDF online for free. Combine multiple JPG images into a single PDF, customize page size, margins, and orientation — secure and browser-based.",
            canonical: "https://quickpicconvert.com/tools/jpg-to-pdf",
            keywords: "jpg to pdf, convert jpg to pdf, jpg to pdf online, jpg to pdf free, combine jpg to pdf, photos to pdf, jpg images to pdf, browser based jpg to pdf"
        },
        instructions: {
            title: "Convert JPG to PDF Online",
            description: "Quick Pic Convert’s JPG to PDF tool allows you to convert JPG images into high-quality PDF files instantly. Merge multiple JPG photos, customize layout settings, and export PDFs securely — all processed directly in your browser.",
            steps: [
                {
                    title: "Upload JPG Images",
                    description: "Upload or drag and drop one or multiple JPG images you want to convert into a PDF."
                },
                {
                    title: "Reorder & Customize",
                    description: "Drag images to reorder pages, choose page size, orientation, and adjust margins."
                },
                {
                    title: "Convert to PDF",
                    description: "Click convert to instantly generate a PDF file from your JPG images."
                },
                {
                    title: "Download PDF",
                    description: "Download your JPG to PDF file immediately with no watermark or signup."
                }
            ],
            tips: [
                "Reorder JPG images to control PDF page sequence",
                "Use A4 or Letter size for printing",
                "Adjust margins for better document layout",
                "All processing happens locally in your browser"
            ],
            faqs: [
                {
                    question: "Can I convert multiple JPG files into one PDF?",
                    answer: "Yes, you can upload multiple JPG images and merge them into a single PDF file."
                },
                {
                    question: "Is this JPG to PDF converter free?",
                    answer: "Yes, the tool is completely free with no watermarks or limits."
                },
                {
                    question: "Are my JPG files uploaded?",
                    answer: "No, all conversions are done locally in your browser for full privacy."
                }
            ]
        }
    },

    {
        id: "png-to-pdf",
        icon: FileImage,
        title: "PNG to PDF Converter",
        description: "Convert PNG images to PDF online. Merge multiple PNG files, preserve transparency, and customize page size and margins — fast, free, and secure.",
        category: "PDF Tools",
        color: "from-green-500 to-emerald-500",
        seo: {
            title: "PNG to PDF Converter – Convert PNG Images to PDF Online Free",
            description: "Convert PNG to PDF online for free. Merge multiple PNG images into a single PDF while preserving quality and transparency — browser-based and secure.",
            canonical: "https://quickpicconvert.com/tools/png-to-pdf",
            keywords: "png to pdf, convert png to pdf, png to pdf online, png images to pdf, combine png to pdf, png to pdf free, browser based png to pdf"
        },
        instructions: {
            title: "Convert PNG to PDF Online",
            description: "Quick Pic Convert’s PNG to PDF tool lets you convert PNG images into PDF files while preserving clarity and layout. Combine multiple PNG images, customize page settings, and export PDFs securely — no uploads required.",
            steps: [
                {
                    title: "Upload PNG Images",
                    description: "Upload or drag and drop one or more PNG images."
                },
                {
                    title: "Arrange & Customize",
                    description: "Reorder images, set page size, orientation, and margins as needed."
                },
                {
                    title: "Convert to PDF",
                    description: "Click convert to instantly generate a PDF from your PNG images."
                },
                {
                    title: "Download PDF",
                    description: "Download your converted PDF instantly without any watermark."
                }
            ],
            tips: [
                "PNG images are ideal for graphics and screenshots",
                "Reorder images before conversion to control page order",
                "Use Auto page size for best image fit",
                "All PNG to PDF conversions happen in your browser"
            ],
            faqs: [
                {
                    question: "Does PNG to PDF preserve image quality?",
                    answer: "Yes, PNG images are converted without quality loss, preserving sharpness and details."
                },
                {
                    question: "Can I merge multiple PNG files into one PDF?",
                    answer: "Yes, multiple PNG images can be combined into a single PDF file."
                },
                {
                    question: "Is this PNG to PDF converter secure?",
                    answer: "Yes, files are processed locally and never uploaded to any server."
                }
            ]
        }
    }



]



export const categories = [...new Set(tools.map((tool) => tool.category))];

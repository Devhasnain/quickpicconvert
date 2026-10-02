import { Code, Crop, FileCode, ImageUpscale, RotateCw, Scan, ScanText, Stamp, } from "lucide-react";

import { Jpg, Png } from "./icons";


export const toolCategories = ["All", "Optimize", "Convert", "Edit", "Utility"];

export const toolCards = [
  {
    title: "Compress Image",
    slug: "/tools/image-compressor",
    excerpt: "Shrink JPG, PNG, and WebP files for free without losing quality.",
    image: "",
    mainLink: true,
    capitalize: true,
    category: "Optimize",
    icon: <Crop size={30} />,
  },
  {
    title: "Image to Webp",
    slug: "/tools/image-to-webp",
    excerpt: "Convert PNG or JPG to WebP for smaller files and faster websites.",
    image: "",
    mainLink: true,
    category: "Optimize",
    icon: <FileCode size={30} />,
  },
  {
    title: "Image to JPG",
    slug: "/tools/image-to-jpg",
    excerpt: "Convert PNG or WebP to JPG online. Fast, free, and private.",
    image: "",
    mainLink: true,
    category: "Convert",
    icon: <Jpg />,
  },
  {
    title: "Image to PNG",
    slug: "/tools/image-to-png",
    excerpt: "Convert JPG or WebP to PNG online with sharp, high quality output.",
    image: "",
    mainLink: true,
    category: "Convert",
    icon: <Png />,
  },
  // {
  //     title: "Upscale Image",
  //     slug: "/tools/upscale-image",
  //     excerpt: "",
  //     image: "",
  //     mainLink: false,
  //     category: "Optimize",
  // },
  {
    title: "Crop Image",
    slug: "/tools/image-cropper",
    excerpt: "Crop photos to any size or ratio right in your browser.",
    image: "",
    mainLink: false,
    category: "Edit",
    icon: <Scan />,
  },
  {
    title: "Resize Image",
    slug: "/tools/resize-image",
    excerpt: "Resize images by pixels or percentage in just a few clicks.",
    image: "",
    mainLink: false,
    category: "Edit",
    icon: <ImageUpscale />,
  },
  {
    title: "Watermark Image",
    slug: "/tools/watermark-image",
    excerpt: "Add a text or logo watermark to protect your photos for free.",
    image: "",
    category: "Convert",
    icon: <Stamp />,
  },
  {
    title: "Rotate Image",
    slug: "/tools/rotate-image",
    excerpt: "Rotate or flip images online and fix sideways photos fast.",
    image: "",
    category: "Edit",
    icon: <RotateCw />,
  },
  {
    title: "Image to Base64",
    slug: "/tools/image-to-base64",
    excerpt: "Turn any image into a Base64 string for HTML, CSS, or code.",
    image: "",
    category: "Convert",
    icon: <Code />,
  },
  // {
  //     title: "Image color Picker",
  //     slug: "/tools/image-color-picker",
  //     excerpt: "",
  //     image: "",
  //     category:"Utility"
  // },
  // {
  //     title: "Image to Text",
  //     slug: "/tools/image-to-text",
  //     excerpt: "",
  //     image: "",
  //     category:"Utility"
  // },
  {
    title: "Image Meta Data Reader",
    slug: "/tools/image-metadata-reader",
    excerpt: "Read EXIF data like camera, date, and size from any image.",
    image: "",
    category: "Utility",
    icon: <ScanText />,
  },
];

export const toolObject = [
  {
    title: "Base64 to Image",
    slug: "image-to-base64",
    excerpt:
      "Convert Base64 to image online for free. Paste your Base64 string, preview the picture, and download it as PNG, JPG, or WebP.",
  },
  {
    title: "Image Color Picker",
    slug: "image-color-picker",
    excerpt:
      "Pick colors from any image online for free. Click anywhere on your photo to get HEX, RGB, and HSL color codes instantly.",
  },
  {
    title: "Compress Image",
    slug: "image-compressor",
    excerpt:
      "Compress JPG, PNG, and WebP images online for free. Reduce file size with little to no visible quality loss. Fast and private.",
  },
  {
    title: "Image Converter",
    slug: "image-converter",
    excerpt:
      "Free online image converter for PNG, JPG, and WebP. Convert one or many images in your browser with fast speed and full privacy.",
  },
  {
    title: "Crop Image",
    slug: "image-cropper",
    excerpt:
      "Crop images online for free with a simple visual editor. Choose any size or aspect ratio and download your photo in seconds.",
  },
  {
    title: "Image Meta Data Reader",
    slug: "image-metadata-reader",
    excerpt:
      "Read image metadata online for free. Check EXIF details like camera model, date, size, and location. Your file never leaves your device.",
  },
  {
    title: "Image to Base64",
    slug: "image-to-base64",
    excerpt:
      "Convert any image to a Base64 string online for free. Copy the code for HTML, CSS, or JSON with one click.",
  },
  {
    title: "Image to JPG",
    slug: "image-to-jpg",
    excerpt:
      "Convert PNG, WebP, and other images to JPG online for free. Get smaller files that open on any device, with no sign up.",
  },
  {
    title: "Image to PNG",
    slug: "image-to-png",
    excerpt:
      "Convert JPG, WebP, and other images to PNG online for free. Keep sharp, lossless quality right in your browser.",
  },
  {
    title: "Image to Text",
    slug: "image-to-text",
    excerpt:
      "Extract text from images online for free. Upload a photo or screenshot and copy the text in seconds.",
  },
  {
    title: "Image to Webp",
    slug: "image-to-webp",
    excerpt:
      "Convert PNG and JPG images to WebP online for free. Reduce file size and improve your website speed and SEO.",
  },
  {
    title: "Jpg to Png",
    slug: "jpg-to-png",
    excerpt:
      "Convert JPG to PNG online for free. Get high quality PNG files in seconds, with no upload and no watermark.",
  },
  {
    title: "Jpg to Webp",
    slug: "jpg-to-webp",
    excerpt:
      "Convert JPG to WebP online for free. Shrink your images, speed up your pages, and keep great quality.",
  },
  {
    title: "Png to Jpg",
    slug: "png-to-jpg",
    excerpt:
      "Convert PNG to JPG online for free. Make lighter images that upload fast and work on every device.",
  },
  {
    title: "Png to Webp",
    slug: "png-to-webp",
    excerpt:
      "Convert PNG to WebP online for free. Get smaller images for faster websites while keeping clear quality.",
  },
  {
    title: "Resize Image",
    slug: "resize-image",
    excerpt:
      "Resize images online for free. Set an exact width and height or use a percentage, then download in PNG, JPG, or WebP.",
  },
  {
    title: "Rotate Image",
    slug: "rotate-image",
    excerpt:
      "Rotate images online for free. Turn photos 90, 180, or 270 degrees or flip them, then download in one click.",
  },
  {
    title: "Watermark Image",
    slug: "watermark-image",
    excerpt:
      "Add a text or logo watermark to your images online for free. Set the position, size, and opacity to protect your photos.",
  },
  {
    title: "Webp to Jpg",
    slug: "webp-to-jpg",
    excerpt:
      "Convert WebP to JPG online for free. Make your images open on any phone, app, or website in seconds.",
  },
  {
    title: "Webp to Png",
    slug: "webp-to-png",
    excerpt:
      "Convert WebP to PNG online for free. Keep clear quality and use your images anywhere, with no upload.",
  },
];
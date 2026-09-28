import { Code, Crop, FileCode, ImageUpscale, RotateCw, Scan, ScanText, Stamp, } from "lucide-react";

import { Jpg, Png } from "./icons";


export const toolCategories = ["All", "Optimize", "Convert", "Edit", "Utility"];

export const toolCards = [
  {
    title: "Compress Image",
    slug: "/tools/image-compressor",
    excerpt: "",
    image: "",
    mainLink: true,
    capitalize: true,
    category: "Optimize",
    icon: <Crop size={30} />,
  },
  {
    title: "Image to Webp",
    slug: "/tools/image-to-webp",
    excerpt: "",
    image: "",
    mainLink: true,
    category: "Optimize",
    icon: <FileCode size={30} />,
  },
  {
    title: "Image to JPG",
    slug: "/tools/image-to-jpg",
    excerpt: "",
    image: "",
    mainLink: true,
    category: "Convert",
    icon: <Jpg />,
  },
  {
    title: "Image to PNG",
    slug: "/tools/image-to-png",
    excerpt: "",
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
    excerpt: "",
    image: "",
    mainLink: false,
    category: "Edit",
    icon: <Scan />,
  },
  {
    title: "Resize Image",
    slug: "/tools/resize-image",
    excerpt: "",
    image: "",
    mainLink: false,
    category: "Edit",
    icon: <ImageUpscale />,
  },
  {
    title: "Watermark Image",
    slug: "/tools/watermark-image",
    excerpt: "",
    image: "",
    category: "Convert",
    icon: <Stamp />,
  },
  {
    title: "Rotate Image",
    slug: "/tools/rotate-image",
    excerpt: "",
    image: "",
    category: "Edit",
    icon: <RotateCw />,
  },
  {
    title: "Image to Base64",
    slug: "/tools/image-to-base64",
    excerpt: "",
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
    excerpt: "",
    image: "",
    category: "Utility",
    icon: <ScanText />,
  },
];

export const toolObject = [
  {
    title: "Base64 to Image",
    slug: "image-to-base64",
  },
  {
    title: "Image Color Picker",
    slug: "image-color-picker",
  },
  {
    title: "Compress Image",
    slug: "image-compressor",
  },
  {
    title: "Image Converter",
    slug: "image-converter",
  },
  {
    title: "Crop Image",
    slug: "image-cropper",
  },
  {
    title: "Image Meta Data Reader",
    slug: "image-metadata-reader",
  },
  {
    title: "Image to Base64",
    slug: "image-to-base64",
  },
  {
    title: "Image to JPG",
    slug: "image-to-jpg",
  },
  {
    title: "Image to PNG",
    slug: "image-to-png",
  },
  {
    title: "Image to Text",
    slug: "image-to-text",
  },
  {
    title: "Image to Webp",
    slug: "image-to-webp",
  },
  {
    title: "Jpg to Png",
    slug: "jpg-to-png",
  },
  {
    title: "Jpg to Webp",
    slug: "jpg-to-webp",
  },
  {
    title: "Png to Jpg",
    slug: "png-to-jpg",
  },
  {
    title: "Png to Webp",
    slug: "png-to-webp",
  },
  {
    title: "Resize Image",
    slug: "resize-image",
  },
  {
    title: "Rotate Image",
    slug: "rotate-image",
  },
  {
    title: "Watermark Image",
    slug: "watermark-image",
  },
  {
    title: "Webp to Jpg",
    slug: "webp-to-jpg",
  },
  {
    title: "Webp to Png",
    slug: "webp-to-png",
  },
];

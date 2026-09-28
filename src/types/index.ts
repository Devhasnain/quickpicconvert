export interface WatermarkItem {
  id: string;
  file: File;
  img: ImageBitmap;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}

export interface CompressedResult {
  id: string;
  name: string;
  url: string;
  size: string;
  originalSize: string;
  originalHeight: number;
  originalWidth: number;
  width: number;
  height: number;
}

export interface ImageCompressorProps {
  maxWidth?: number;
  maxHeight?: number;
  outputFormat?: string;
  background?: string;
  quality?: number;
  files: { file: File; id: string }[];
}


export interface ImageToWebpProps {
  files: { file: File; id: string }[];
  outputFormat: string;
  quality?: number;
  background?: string;
}

export interface ImageConverterResults {
  id: string;
  name: string;
  url: string;
  size: string;
  originalSize: string;
  originalFormat: string;
  newFormat: string;
  width: number;
  height: number;
}

export type ResizeMode = "percentage" | "dimensions";

export interface ImageResizerProps {
  files: { file: File, id: string }[];
  mode: ResizeMode;

  percentage?: number;

  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;

  outputFormat?: string;
  quality?: number;
  background?: string;
}

export interface ResizedResult {
  id: string
  name: string;
  url: string;
  size: string;
  originalSize: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
}


export interface ImageRotatorProps {
  files: { file: File, id: string }[];
  degrees: number;
  outputFormat?: string;
  quality?: number;
  background?: string;
}

export interface RotatedResult {
  id: string;
  name: string;
  url: string;
  size: string;
  originalSize: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  degrees: number;
}

export type ToolPageProps = {
  toolPage: {
    slug: string;
    content: string;
    featuredImage:{
      node:{
        sourceUrl:string;
        altText:string;
        title:string
      }
    }
    postMeta: {
      metaTitle: string,
      metaDescription: string
    }
  }
  breadcrumb:BreadCrumb[],
  jsonSchemas:any[]|[]
}

export type BreadCrumb = {
  name:string;
  href:string
}

export type PageMetaProps = {
  title:string;
  description:string;
  image:string;
  date?:string;
  ogType:"article" | any;
  pathname?:string;
  jsonSchema?:any[]|[]
}
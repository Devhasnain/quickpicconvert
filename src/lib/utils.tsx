import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PDFDocument } from "pdf-lib";
import { toast } from "sonner";
import JSZip from "jszip";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dataURLtoBlob = (dataURL: string) => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

export const downloadAsZip = async (
  convertedFiles: { name: string; url: string }[]
) => {
  const zip = new JSZip();

  convertedFiles.forEach((file) => {
    const blob = dataURLtoBlob(file.url);
    zip.file(file.name, blob);
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(zipBlob);
  link.download = "converted-images.zip";
  link.click();

  URL.revokeObjectURL(link.href);
};

export const downloadSingleFile = (file: { name: string; url: string }) => {
  const link = document.createElement("a");
  link.href = file.url;
  link.download = file.name;
  link.click();
};

export const convertImage = async ({
  files,
  mime,
}: {
  files: File[];
  mime: "png" | "jpeg" | "webp" | "jpg";
}) => {
  try {
    const convertedFiles: { name: string; url: string }[] = [];

    for (const file of files) {
      const img = new Image();
      const reader = new FileReader();

      const imageLoaded = new Promise<void>((resolve) => {
        reader.onload = () => {
          img.src = reader.result as string;
        };

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d")!;

          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          const pngUrl = canvas.toDataURL(`image/${mime}`);

          convertedFiles.push({
            name: file.name.replace(/\.[^/.]+$/, `.${mime}`),
            url: pngUrl,
          });

          resolve();
        };
      });

      reader.readAsDataURL(file);
      await imageLoaded;
    }

    return convertedFiles;
  } catch (error) {
    return [];
  }
};

type ImageCompressorProps = {
  maxWidth: number;
  outputFormat: "image/jpeg" | "image/png" | "image/webp";
  background: string;
  quality: number;
  files: File[];
};

export const compressImages = async ({
  maxWidth,
  outputFormat,
  background,
  quality,
  files,
}: ImageCompressorProps) => {
  try {
    const convertedFiles: {
      name: string;
      url: string;
      size: number;
      originalSize: number;
    }[] = [];

    for (const file of files) {
      const img = new Image();
      const reader = new FileReader();

      const imageLoaded = new Promise<void>((resolve) => {
        reader.onload = () => {
          img.src = reader.result as string;
        };

        img.onload = () => {
          const scale = Math.min(1, maxWidth / img.width);
          const canvas = document.createElement("canvas");

          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext("2d")!;

          if (outputFormat === "image/jpeg") {
            ctx.fillStyle = background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const pngUrl = canvas.toDataURL(outputFormat, quality);

          convertedFiles.push({
            size: Number(((pngUrl.length * 0.75) / 1024).toFixed(1)),
            name: file.name.replace(
              /\.[^/.]+$/,
              `.${outputFormat?.split("/")[1]}`
            ),
            url: pngUrl,
            originalSize: Number((file.size / 1024).toFixed(2)),
          });

          resolve();
        };
      });

      reader.readAsDataURL(file);
      await imageLoaded;
    }

    return convertedFiles;
  } catch (error) {
    return [];
  }
};

export const loadImageToCanvas = (file: File) =>
  new Promise<{
    img: HTMLImageElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
  }>((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      resolve({ img, canvas, ctx });
    };
  });

export const loadImageElementToCanvas = (img: HTMLImageElement) =>
  new Promise<{
    img: HTMLImageElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
  }>((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    resolve({ img, canvas, ctx });
  });

export const exportCanvas = (
  canvas: HTMLCanvasElement,
  type = "image/png",
  quality = 0.9
) => canvas.toDataURL(type, quality);

export const cropImage = async (
  file: File,
  crop: { width: number; height: number; x: number; y: number }
) => {
  const { img, canvas, ctx } = await loadImageToCanvas(file);

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    img,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return exportCanvas(canvas);
};

export const resizeImage = async (
  file: File | HTMLImageElement,
  width: number,
  height: number,
  imageType?: "file" | "element"
) => {
  if (imageType === "element") {
    const { img, canvas, ctx } = await loadImageElementToCanvas(
      file as HTMLImageElement
    );

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    return exportCanvas(canvas);
  } else {
    const { img, canvas, ctx } = await loadImageToCanvas(file as File);

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    return exportCanvas(canvas);
  }
};

export const applyFilters = async (file: File, filter: any) => {
  const { canvas, ctx } = await loadImageToCanvas(file);
  ctx.filter = filter;
  ctx.drawImage(canvas, 0, 0);
  return exportCanvas(canvas);
};

export function normalizeMetadata(tags: any) {
  return Object.keys(tags).map((key) => ({
    tag: key,
    description: tags[key].description ?? "",
    value: Array.isArray(tags[key].value)
      ? tags[key].value.join(", ")
      : tags[key].value ?? "",
  }));
}

export function exportAsHTML(tags: any, filename: string) {
  const data = normalizeMetadata(tags);

  let rows = data
    .map(
      (item) => `
      <tr>
        <td>${item.tag}</td>
        <td>${item.description}</td>
        <td>${item.value}</td>
      </tr>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Image Metadata</title>
  <style>
    body { font-family: Arial, sans-serif; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
    th { background: #f4f4f4; }
  </style>
</head>
<body>
  <h2>Image Metadata</h2>
  <table>
    <thead>
      <tr>
        <th>Tag</th>
        <th>Description</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</body>
</html>
`;

  downloadFile(html, filename, "text/html");
}

export function exportAsTXT(tags: any, filename: string) {
  const data = normalizeMetadata(tags);

  const text = data.map((item) => `${item.tag}: ${item.value}`).join("\n");

  downloadFile(text, filename, "text/plain");
}

export function exportAsCSV(tags: any, filename: string) {
  const data = normalizeMetadata(tags);

  const escapeCSV = (value: any) => `"${String(value).replace(/"/g, '""')}"`;

  const csv = [
    ["Tag", "Description", "Value"].join(","),
    ...data.map((item) =>
      [
        escapeCSV(item.tag),
        escapeCSV(item.description),
        escapeCSV(item.value),
      ].join(",")
    ),
  ].join("\n");

  downloadFile(csv, filename, "text/csv");
}

function downloadFile(content: any, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadBlob(blob: Blob, filename = "") {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


export const getFileFromClipboard = (event: ClipboardEvent) => {
  try {
    const items = event.clipboardData?.items;
    if (!items) return;

    let returnValue: any;

    for (const item of items) {
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file && /\.(jpg|jpeg|png|webp)$/i.test(file.name)) {
          returnValue = file;
        } else {
          throw new Error("Please select an image file.");
        }
      }

      // if (item.kind === "string") {
      //   item.getAsString(async (text) => {
      //     const trimmed = text.trim();
      //     const isValidUrl = new URL(trimmed);
      //     if (isValidUrl) {
      //       returnValue = await handleUrl(trimmed);
      //     } else {
      //       throw new Error("Please paste a valid image url.");
      //     }
      //   });
      // }
    }

    return returnValue;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

// async function handleUrl(url: string) {
//   const res = await fetch("/api/fetch-image", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ url }),
//   });

//   const data = await res.json();
//   return data;
// }

export const getOutputFormateLabel = (value: string) => {
  switch (value) {
    case "image/webp":
      return "WEBP";
    case "image/jpeg":
      return "JPEG";
    case "image/png":
      return "PNG";
    default:
      return "WEBP";
  }
};

export const getImageFilterLabel = (value: string) => {
  switch (value) {
    case "none":
      return "No Filter";
    case "grayscale(100%)":
      return "Grayscale";
    case "contrast(120%)":
      return "Contrast";
    case "brightness(120%)":
      return "Brightness";
    case "sepia(100%)":
      return "Sepia";
    default:
      return "No Filter";
  }
};

export const loadImage = (file: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = file;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

export const getDataUrlSize = (dataUrl: string) => {
  const base64 = dataUrl?.split(",")[1];
  return Math.round((base64.length * 3) / 4);
};

export const getCompressedPercent = (original: number, output: number) => {
  return Math.round(((original - output) / original) * 100);
};

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export const CROP_PRESETS = [
  {
    id: "insta_square",
    label: "1:1",
    ratio: 1 / 1,
    crop: { unit: "%", x: 20, y: 20, width: 60, height: 60 },
  },
  {
    id: "insta_portrait",
    label: "4:5",
    ratio: 4 / 5,
    crop: { unit: "%", x: 20, y: 10, width: 60, height: 75 },
  },
  {
    id: "insta_story",
    label: "9:16",
    ratio: 9 / 16,
    crop: { unit: "%", x: 25, y: 5, width: 50, height: 90 },
  },
  {
    id: "twitter_post",
    label: "16:9",
    ratio: 16 / 9,
    crop: { unit: "%", x: 5, y: 25, width: 90, height: 50 },
  },
  {
    id: "insta_landscape",
    label: "1.91:1",
    ratio: 1.91 / 1,
    crop: { unit: "%", x: 5, y: 30, width: 90, height: 47 },
  },
  {
    id: "fb_cover",
    label: "2.63:1",
    ratio: 2.63 / 1,
    crop: { unit: "%", x: 5, y: 35, width: 90, height: 34 },
  },
];

function getPageSize(
  size: "Auto" | "Letter" | "A4",
  imageWidth: number,
  imageHeight: number
) {
  if (size === "Auto") {
    return { width: imageWidth, height: imageHeight };
  }
  if (size === "Letter") {
    return { width: 612, height: 792 };
  }
  return { width: 595, height: 842 }; // A4
}

const mmToPt = (mm: number) => mm * 2.83465;

export async function addImagesToPdf(
  images: {
    id: string;
    file: File;
    preview: string;
  }[],
  pageSize: "Auto" | "Letter" | "A4",
  orientation: string,
  margin: number
) {
  const pdfDoc = await PDFDocument.create();

  for (const img of images) {
    const bytes = await img.file.arrayBuffer();
    const image =
      img.file.type === "image/png"
        ? await pdfDoc.embedPng(bytes)
        : await pdfDoc.embedJpg(bytes);

    let { width, height } = getPageSize(pageSize, image.width, image.height);

    if (orientation === "landscape") {
      [width, height] = [height, width];
    }

    const page = pdfDoc.addPage([width, height]);

    const marginPt = mmToPt(margin);
    const maxWidth = width - marginPt * 2;
    const maxHeight = height - marginPt * 2;

    const scale = Math.min(maxWidth / image.width, maxHeight / image.height);

    const imgWidth = image.width * scale;
    const imgHeight = image.height * scale;

    page.drawImage(image, {
      x: (width - imgWidth) / 2,
      y: (height - imgHeight) / 2,
      width: imgWidth,
      height: imgHeight,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
}

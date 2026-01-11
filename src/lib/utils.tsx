import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import JSZip, { files } from "jszip";


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
  file: File,
  width: number,
  height: number
) => {
  const { img, canvas, ctx } = await loadImageToCanvas(file);

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  return exportCanvas(canvas);
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

  URL.revokeObjectURL(url);
}

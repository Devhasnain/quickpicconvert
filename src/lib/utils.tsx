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

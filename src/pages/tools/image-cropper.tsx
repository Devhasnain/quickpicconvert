import "react-image-crop/dist/ReactCrop.css";

import ReactCrop, { Crop, PercentCrop, PixelCrop } from "react-image-crop";
import UploadImageBtn from "@/components/tool/UploadImageBtn";
import ToolPageLayout from "@/components/tool/ToolPageLayout";
import { CROP_PRESETS, loadImage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { memo, useRef, useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";


const ImageCropper = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 20,
    y: 20,
    width: 60,
    height: 60,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const onCropChange = (_: PixelCrop, percentageCrop: PercentCrop) => {
    setCrop(percentageCrop);
    setCompletedCrop(percentageCrop);
  };

  const openExplorer = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      const imageElement = await loadImage(
        URL.createObjectURL(e.target.files[0])
      );
      setImageElement(imageElement);
      if (inputRef?.current) inputRef.current.value = "";
    }
  };

  const generateCanvas = () => {
    if (!canvasRef.current || !imageElement || !completedCrop) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { naturalWidth, naturalHeight } = imageElement;

    const cropWidth = Math.round((completedCrop.width / 100) * naturalWidth);
    const cropHeight = Math.round((completedCrop.height / 100) * naturalHeight);
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      imageElement,
      Math.round((completedCrop.x / 100) * naturalWidth),
      Math.round((completedCrop.y / 100) * naturalHeight),
      cropWidth,
      cropHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
  };

  const downloadImage = () => {
    try {
      setIsLoading(true);
      if (!canvasRef.current || !file)
        throw new Error("Unexpected error, Please reload the page.");
      generateCanvas();
      canvasRef.current.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `cropped-${file?.name.replace(/\.\w+$/, "")}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleUpload}
      />

      <ToolPageLayout containerClassName="max-w-4xl">
        {!imageElement ? (
          <UploadImageBtn onClick={openExplorer} />
        ) : (
          <div className="shadow-2xl border rounded-xl w-full grid grid-cols-12 overflow-hidden">
            <div className="col-span-9">
              <ReactCrop
                disabled={isLoading}
                crop={crop}
                onChange={onCropChange}
                onComplete={onCropChange}
              >
                <img
                  src={imageElement.src || ""}
                  alt="Preview"
                  className="max-w-full !max-h-[70vh] object-contain"
                />
              </ReactCrop>
            </div>
            <div className="col-span-3 h-full p-5 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3">
                <CropPresets
                  disabled={isLoading}
                  onSelect={(crop) => {
                    setCompletedCrop(crop);
                    setCrop(crop);
                  }}
                />
              </div>
              <Button disabled={isLoading} onClick={downloadImage}>
                {isLoading ? "Downloading" : "Download"} <Download />
              </Button>
              <Button onClick={openExplorer} disabled={isLoading}>
                Choose file
              </Button>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </ToolPageLayout>
    </>
  );
};

const getBoxStyle = (ratio: number | null) => {
  const MAX = 60; // max inner size

  if (ratio && ratio >= 1) {
    return {
      width: `${MAX}px`,
      height: `${MAX / ratio}px`,
    };
  }

  return {
    width: `${MAX * (ratio ? ratio : 0)}px`,
    height: `${MAX}px`,
  };
};

const CropPresets = memo(
  ({
    onSelect,
    disabled,
  }: {
    disabled: boolean;
    onSelect: (crop: any) => void;
  }) => {
    return (
      <>
        {CROP_PRESETS.map((preset) => (
          <div
            aria-disabled={disabled}
            key={preset.id}
            className={`border flex flex-col items-center justify-center p-2 rounded-md cursor-pointer ${
              disabled && "cursor-not-allowed"
            }`}
            onClick={disabled ? () => {} : () => onSelect(preset.crop)}
          >
            <div
              className="border flex flex-col items-center justify-center bg-gray-300 rounded-sm"
              style={getBoxStyle(preset.ratio)}
            >
              <span className="text-sm font-semibold">{preset?.label}</span>
            </div>
          </div>
        ))}
      </>
    );
  }
);

export default ImageCropper;

import "react-image-crop/dist/ReactCrop.css";

import { HiddenFileInput, SelectImageButton, ToolSettingsSidbar, } from "@/components";
import ReactCrop, { Crop, PercentCrop, PixelCrop } from "react-image-crop";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useImageCropperStore } from "@/store";
import { Settings } from "lucide-react";
import { loadImage } from "@/lib/utils";
import { runWorker } from "@/workers";
import toast from "react-hot-toast";


export const ImageCropperTool = () => {
  const workerRef = useRef<Worker>();
  const [openSettings, setOpenSettings] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const { file, addFile, resetStore, imageElement } = useImageCropperStore();

  const openExplorer = () => {
    inputRef.current?.click();
  };

  const handleFilesOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (files?.length) {
      const promise = toast.promise(loadImage(URL.createObjectURL(files[0])), {
        loading: "Loading image",
        error: "Unexpected Error, Please tryagain",
      });
      promise.then((r) => addFile(files[0], r));
      promise.finally(() => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      });
    }
  };

  const onCropChange = (_: PixelCrop, percentageCrop: PercentCrop) => {
    setCrop(percentageCrop);
  };

  const handleCropImage = () => {
    const promise = toast.promise(
      runWorker(workerRef.current, {
        type: "CROP",
        payload: { file, crop },
      }),
      {
        loading: "Cropping image...",
        success: "Image cropped successfully.",
        error: "Unexpected error",
      }
    );
    promise.then((url: any) => {
      if (!url) return;
      const a = document.createElement("a");
      a.href = url;
      a.download = file?.name || "Cropped-image.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/imageResize.worker", import.meta.url)
    );
    return () => workerRef.current?.terminate();
  }, []);

  return (
    <>
      <HiddenFileInput
        ref={inputRef}
        multiple={false}
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFilesOnChange}
      />

      <section className="bg-gray-100">
        {file ? (
          <div className="grid grid-cols-1 sm:grid-cols-12 relative">
            <button
              onClick={() => setOpenSettings(!openSettings)}
              className="flex md:hidden text-white bg-primary rounded-full p-2 absolute top-3 right-3 z-20 shadow-lg cursor-pointer"
            >
              <Settings size={20} />
            </button>
            <div className="h-full overflow-y-auto px-10 sm:px-2.5 col-span-full md:col-span-8 2xl:col-span-9 py-5 sm:py-10 flex flex-col">
              <ReactCrop
                crop={crop}
                onChange={onCropChange}
                onComplete={onCropChange}
                className="w-9/12 sm:w-8/12 md:w-10/12 mx-auto"
              >
                <img
                  src={imageElement?.src || ""}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </ReactCrop>
            </div>

            <ToolSettingsSidbar
              title="Image Cropper"
              convertBtnText="Crop Image"
              open={openSettings}
              onAddImages={openExplorer}
              onClearAll={resetStore}
              disableConvert={!file}
              canClearAll={!!file}
              onConvertImages={handleCropImage}
              onOpenChange={setOpenSettings}
            />
          </div>
        ) : (
          <SelectImageButton onClick={openExplorer} />
        )}
      </section>
    </>
  );
};

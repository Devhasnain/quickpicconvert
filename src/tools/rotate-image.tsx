import { HiddenFileInput, ImageCard, SelectImageButton, ToolSettingsSidbar, } from "@/components";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useImageRotateStore } from "@/store";
import { formatBytes } from "@/lib/utils";
import { Settings } from "lucide-react";
import { RotatedResult } from "@/types";
import { runWorker } from "@/workers";
import toast from "react-hot-toast";
import { v4 } from "uuid";


export const RotateImageTool = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const workerRef = useRef<Worker>();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    files,
    addFiles,
    removeFile,
    rotate,
    incrementRotate,
    decrementRotate,
    resetStore,
    setResults
  } = useImageRotateStore();

  const openExplorer = () => {
    inputRef.current?.click();
  };

  const hasNewFiles = useMemo(() => {
    let newFilesLength = files.filter((item) => !item?.output?.id);
    if (newFilesLength.length) return true;
    return false;
  }, [files]);

  const canDownloadZip = useMemo(() => {
    let newFilesLength = files.filter((item) => item?.output?.id);
    if (newFilesLength.length > 1) return true;
    return false;
  }, [files]);

  const handleFilesOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newFiles = e.target.files;
    if (files?.length) {
      addFiles([
        ...Array.from(newFiles || []).map((item) => ({ file: item, id: v4() })),
        ...files,
      ]);
    } else {
      addFiles(
        Array.from(newFiles || []).map((item) => ({ file: item, id: v4() }))
      );
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRotateImages = () => {
    if (!files.length) return addFiles([]);
    setIsRotating(true)
    const promise = toast.promise(
      runWorker(workerRef.current, {
        type: "ROTATE",
        payload: {
          files,
          degrees: rotate,
        },
      }),
      {
        loading: `Rotated ${files.length > 1 ? "Images" : "Image"}`,
        success: "Rotated successfully.",
        error: "Unpexected Error.",
      }
    );
    promise.then((res) => setResults(res as RotatedResult[]));
    promise.finally(()=>setIsRotating(false))
  };

  const handleDownload = (url: string, filename: string) => {
    if (!url || !filename) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadZip = () => {
    setIsDownloading(true);
    const promise = toast.promise(
      runWorker(workerRef.current, {
        type: "DOWNLOAD",
        payload: files.map((item) => ({
          url: item.output?.url,
          name: item.output?.name,
        })),
      }),
      {
        loading: `Downloading Zip`,
        success: "Zip Downloaded successfully.",
        error: "Unpexected Error.",
      }
    );
    promise.then((res) => {
      const zipUrl = URL?.createObjectURL(res as Blob);
      handleDownload(zipUrl, "Rotated-images.zip");
      URL.revokeObjectURL(zipUrl);
    });
    promise.finally(() => setIsDownloading(false));
  };

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/imageRotater.worker", import.meta.url)
    );
    return () => workerRef.current?.terminate();
  }, []);
  return (
    <>
      <HiddenFileInput
        ref={inputRef}
        multiple={true}
        accept="image/png,image/jpeg"
        onChange={handleFilesOnChange}
      />

      <section className="bg-gray-100">
        {files.length ? (
          <div className=" h-full md:h-screen grid grid-cols-1 sm:grid-cols-12 relative">
            <button
              onClick={() => setOpenSettings(!openSettings)}
              className="flex md:hidden text-white bg-primary rounded-full p-2 absolute top-3 right-3 z-20 shadow-lg cursor-pointer"
            >
              <Settings size={20} />
            </button>
            <div className="h-full overflow-y-auto px-2.5 col-span-full md:col-span-8 2xl:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-5 sm:pt-10 pb-20 gap-2">
              {files.map((f, i) => (
                <ImageCard
                  f={f?.file}
                  key={f.id}
                  fileSize={formatBytes(f?.file?.size)}
                  removeFile={() => removeFile(f?.id)}
                  isDownloadAble={!!f?.output?.url}
                  downloadFile={() =>
                    handleDownload(f?.output?.url || "", f?.output?.name || "")
                  }
                  imageStyle={{
                    rotate:`${rotate}deg`
                  }}
                />
              ))}
            </div>

            <ToolSettingsSidbar
              open={openSettings}
              title="Rotate Images"
              convertBtnText="Rotate Images"
              onOpenChange={setOpenSettings}
              canClearAll={files.length > 1}
              isConverting={isRotating}
              isDownloading={isDownloading}
              canDownloadZip={canDownloadZip}
              disableConvert={!hasNewFiles}
              onClearAll={resetStore}
              onAddImages={openExplorer}
              onConvertImages={handleRotateImages}
              onDownloadZip={handleDownloadZip}
            >
              {hasNewFiles && <div className="flex flex-col space-y-2">
                <button
                  className="rounded-lg cursor-pointer border border-gray-200 py-2.5 bg-primary text-white px-3"
                  onClick={() =>
                    incrementRotate(rotate > 270 ? 0 : rotate + 90)
                  }
                >
                  Rotate Right
                </button>
                <button
                  className="rounded-lg cursor-pointer border border-gray-200 py-2.5 bg-primary text-white px-3"
                  onClick={() =>
                    decrementRotate(rotate < -270 ? 0 : rotate - 90)
                  }
                >
                  Rotate Left
                </button>
              </div>}
            </ToolSettingsSidbar>
          </div>
        ) : (
          <SelectImageButton onClick={openExplorer}/>
        )}
      </section>
    </>
  );
};

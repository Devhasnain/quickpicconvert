import { HiddenFileInput, ImageCard, SelectImageButton, ToolSettingsSidbar, } from "@/components";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useImageWebpConverterStore } from "@/store";
import { ImageConverterResults } from "@/types";
import { formatBytes } from "@/lib/utils";
import { Settings } from "lucide-react";
import { runWorker } from "@/workers";
import toast from "react-hot-toast";
import { v4 } from "uuid";


export const ImageToWebpTool = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const workerRef = useRef<Worker>();
  const [openSettings, setOpenSettings] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { files, addFiles, removeFile, resetStore, setResults } =
    useImageWebpConverterStore();

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

  const handleConvert = () => {
    if (!files.length) return addFiles([]);
    setIsConverting(true);
    const promise = toast.promise(
      runWorker(workerRef.current, {
        type: "CONVERT",
        payload: {
          files: files?.filter((item) => !item?.output?.id),
          outputFormat: "image/webp",
          background: "#ffffff",
        },
      }),
      {
        loading: `Converting ${files.length > 1 ? "Images" : "Image"}`,
        success: "Converted successfully.",
        error: "Unpexected Error.",
      }
    );
    promise.then((res) => setResults(res as ImageConverterResults[]));
    promise.finally(() => setIsConverting(false));
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
      handleDownload(zipUrl, "Quickpicconvert-converted-images.zip");
      URL.revokeObjectURL(zipUrl);
    });
    promise.finally(() => setIsDownloading(false));
  };

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/imageConverter.worker", import.meta.url)
    );
    return () => {
      workerRef.current?.terminate();
      resetStore();
    };
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
          <div className="h-screen grid grid-cols-1 md:grid-cols-12 relative">
            <button
              onClick={() => setOpenSettings(!openSettings)}
              className="block md:hidden text-white bg-primary rounded-full p-2 absolute top-3 right-3 z-20 shadow-lg cursor-pointer"
            >
              <Settings size={20} />
            </button>
            <div className=" h-full overflow-y-auto px-10 col-span-full md:col-span-8 2xl:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-start pt-5 sm:pt-10 pb-20 gap-2">
              {files.map((f) => (
                <ImageCard
                  f={f?.file}
                  key={f?.id}
                  fileSize={formatBytes(f?.file?.size)}
                  isDownloadAble={!!f?.output?.url}
                  reducedSize={f?.output?.size}
                  removeFile={() => removeFile(f.id)}
                  downloadFile={() =>
                    handleDownload(f?.output?.url || "", f?.output?.name)
                  }
                />
              ))}
            </div>

            <ToolSettingsSidbar
              open={openSettings}
              title="Image to Webp"
              isConverting={isConverting}
              isDownloading={isDownloading}
              canClearAll={files.length > 1}
              canDownloadZip={canDownloadZip}
              disableConvert={!hasNewFiles}
              onClearAll={resetStore}
              onAddImages={openExplorer}
              onConvertImages={handleConvert}
              onDownloadZip={handleDownloadZip}
            />
          </div>
        ) : (
          <SelectImageButton onClick={openExplorer}/>
        )}
      </section>
    </>
  );
};
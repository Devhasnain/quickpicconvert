import { HiddenFileInput, ImageCard, SelectImageButton, ToolSettingsSidbar, } from "@/components";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useImageCompressorStore } from "@/store";
import { CompressedResult } from "@/types";
import { formatBytes } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { Settings } from "lucide-react";
import { runWorker } from "@/workers";
import { v4 } from "uuid";


const initailSettings = Object.freeze({
  maxHeight: 0,
  maxWidth: 0,
  outputFormat: "image/webp",
});

export const ImageCompressorTool = () => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const workerRef = useRef<Worker>();
  const [openSettings, setOpenSettings] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { files, addFiles, removeFile, setResults, resetStore } =
    useImageCompressorStore();

  const [settings, setSettings] = useState(initailSettings);

  const hasNewFiles = useMemo(() => {
    let newFilesLength = files.filter((item) => !item?.compressed?.id);
    if (newFilesLength.length) return true;
    return false;
  }, [files]);

  const canDownloadZip = useMemo(() => {
    let newFilesLength = files.filter((item) => item?.compressed?.id);
    if (newFilesLength.length > 1) return true;
    return false;
  }, [files]);

  const openExplorer = () => {
    inputRef.current?.click();
  };

  const handleSettingsOnChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setSettings((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

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

  const handleCompress = async () => {
    if (!files.length) return addFiles([]);
    setIsCompressing(true);
    const promise = toast.promise(
      runWorker(workerRef.current, {
        type: "COMPRESS",
        payload: {
          files: files?.filter((item) => !item?.compressed?.id),
          ...settings,
          outputFormat:
            (settings.outputFormat as any) === "none"
              ? undefined
              : settings.outputFormat,
        },
      }),
      {
        loading: `Compressiong ${files.length > 1 ? "Images" : "Image"}`,
        success: "Compressed successfully.",
        error: "Unpexected Error.",
      }
    );
    promise.then((res) => setResults([...(res as CompressedResult[])]));
    promise.finally(() => setIsCompressing(false));
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
          url: item.compressed?.url,
          name: item.compressed?.name,
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
      handleDownload(zipUrl, "Compressed-images.zip");
      URL.revokeObjectURL(zipUrl);
    });
    promise.finally(() => setIsDownloading(false));
  };

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/imageCompressor.worker", import.meta.url)
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
        accept="image/png,image/webp"
        onChange={handleFilesOnChange}
      />
      <section className="bg-gray-100">
        {files.length ? (
          <div className="h-auto md:h-screen grid grid-cols-1 md:grid-cols-12 relative">
            <button
              onClick={() => setOpenSettings(!openSettings)}
              className="flex md:hidden text-white bg-primary rounded-full p-2 absolute top-3 right-3 z-20 shadow-lg cursor-pointer"
            >
              <Settings size={20} />
            </button>
            <div className="h-full overflow-y-auto px-10 col-span-full sm:col-span-7 md:col-span-8 2xl:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-5 sm:pt-10 pb-20 gap-2">
              {files.map((f) => (
                <ImageCard
                  f={f?.file}
                  key={f.id}
                  fileSize={formatBytes(f?.file?.size)}
                  removeFile={() => removeFile(f?.id)}
                  isDownloadAble={!!f?.compressed?.url}
                  reducedSize={f?.compressed?.size}
                  downloadFile={() =>
                    handleDownload(
                      f?.compressed?.url || "",
                      f?.compressed?.name || ""
                    )
                  }
                />
              ))}
            </div>
            <ToolSettingsSidbar
              open={openSettings}
              title="Image Compressor"
              convertBtnText="Compress Images"
              isConverting={isCompressing}
              isDownloading={isDownloading}
              canClearAll={files.length > 1}
              canDownloadZip={canDownloadZip}
              disableConvert={!hasNewFiles}
              onClearAll={resetStore}
              onAddImages={openExplorer}
              onConvertImages={handleCompress}
              onDownloadZip={handleDownloadZip}
            >
              <div className="space-y-4">
                <div className="flex gap-5 items-center">
                  <label
                    className="text-sm font-semibold"
                    htmlFor="outputFormat"
                  >
                    Output:
                  </label>
                  <select
                    onChange={handleSettingsOnChange}
                    value={settings.outputFormat}
                    name="outputFormat"
                    id="outputFormat"
                    className="border border-gray-200 w-full p-4 rounded-lg outline-none hover:bg-gray-100"
                  >
                    <option key={"image/webp"} value="image/webp">
                      Webp
                    </option>
                    <option key={"image/jpeg"} value="image/jpeg">
                      Jpg
                    </option>
                    <option key={"image/png"} value="image/png">
                      Png
                    </option>
                  </select>
                </div>
                <div className="flex gap-5 items-center">
                  <label className="text-sm font-semibold" htmlFor="maxWidth">
                    MaxWidth:
                  </label>
                  <input
                    onChange={handleSettingsOnChange}
                    value={settings.maxWidth}
                    name="maxWidth"
                    id="maxWidth"
                    placeholder="Max width"
                    className="border border-gray-200 w-full p-4 rounded-lg outline-none hover:bg-gray-100"
                  />
                </div>
                <div className="flex gap-5 items-center">
                  <label className="text-sm font-semibold" htmlFor="maxHeight">
                    MaxHeight:
                  </label>
                  <input
                    onChange={handleSettingsOnChange}
                    value={settings.maxHeight}
                    name="maxHeight"
                    id="maxHeight"
                    placeholder="Max height"
                    className="border border-gray-200 w-full p-4 rounded-lg outline-none hover:bg-gray-100"
                  />
                </div>
              </div>
            </ToolSettingsSidbar>
          </div>
        ) : (
          <SelectImageButton onClick={openExplorer} />
        )}
      </section>
    </>
  );
};

import { Container, HiddenFileInput, ImageCard, ToolSettingsSidbar, } from "@/components";
import { ChangeEvent, ReactNode, useEffect, useMemo, useRef, useState, } from "react";
import { Crop, Percent, Settings, SquareCheck } from "lucide-react";
import { useImageResizeStore } from "@/store";
import { formatBytes } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { ResizedResult } from "@/types";
import { runWorker } from "@/workers";
import { v4 } from "uuid";


export const ResizeImageTool = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const workerRef = useRef<Worker>();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    files,
    addFiles,
    removeFile,
    mode,
    setMode,
    percentage,
    setPercentage,
    maintainAspectRatio,
    setMaintainAspectRatio,
    width,
    height,
    setWidth,
    setHeight,
    resetStore,
    setResults,
  } = useImageResizeStore();
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

  const disableSubmit = useMemo(() => {
    if (mode === "dimensions") {
      if (!width || !height) return true;
      return false;
    }
    return false;
  }, [mode, width, height]);

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

  const handleResize = () => {
    if (!files.length) return addFiles([]);
    setIsResizing(true);
    const promise = toast.promise(
      runWorker(workerRef.current, {
        type: "RESIZE",
        payload: {
          files: files?.filter((item) => !item?.output?.id),
          mode,
          percentage,
          width,
          height,
          maintainAspectRatio,
          background: "#ffffff",
        },
      }),
      {
        loading: `Resizing ${files.length > 1 ? "Images" : "Image"}`,
        success: "Resized successfully.",
        error: "Unpexected Error.",
      }
    );
    promise.then((res) => setResults(res as ResizedResult[]));
    promise.finally(() => setIsResizing(false));
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
      handleDownload(zipUrl, "resized-images.zip");
      URL.revokeObjectURL(zipUrl);
    });
    promise.finally(() => setIsDownloading(false));
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
        multiple={true}
        accept="image/png,image/webp,image/jpeg"
        onChange={handleFilesOnChange}
      />
      <section className="bg-gray-100">
        {files.length ? (
          <div className="h-screen grid grid-cols-1 sm:grid-cols-12 relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex md:hidden text-white bg-primary rounded-full p-2 absolute top-3 right-3 z-20 shadow-lg cursor-pointer"
            >
              <Settings size={20} />
            </button>
            <div className="h-full overflow-y-auto px-2.5 col-span-full md:col-span-7 lg:col-span-8 2xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 pt-5 sm:pt-10 pb-20 gap-2">
              {files.map((f, i) => (
                <ImageCard
                  f={f?.file}
                  key={f.id}
                  fileSize={formatBytes(f?.file?.size)}
                  removeFile={() => removeFile(f?.id)}
                  resizedDimensions={
                    f?.output?.width
                      ? `${f?.output?.width} * ${f?.output?.height}`
                      : ""
                  }
                  isDownloadAble={!!f?.output?.url}
                  reducedSize={f?.output?.size}
                  downloadFile={() =>
                    handleDownload(f?.output?.url || "", f?.output?.name || "")
                  }
                />
              ))}
            </div>

            <ToolSettingsSidbar
              className="overflow-y-auto pb-8 md:col-span-5 lg:col-span-4"
              title="Resize Image"
              convertBtnText="Resize Images"
              open={showSettings}
              isConverting={isResizing}
              isDownloading={isDownloading}
              onOpenChange={setShowSettings}
              canDownloadZip={canDownloadZip}
              disableConvert={!hasNewFiles || disableSubmit}
              onAddImages={openExplorer}
              onConvertImages={handleResize}
              canClearAll={files.length > 1}
              onClearAll={resetStore}
              onDownloadZip={handleDownloadZip}
            >
              <div
                className={`${
                  showSettings ? "flex" : "hidden"
                } sm:flex flex-col`}
              >
                <div className="grid grid-cols-2">
                  <ModeButton
                    disabled={isResizing || isDownloading}
                    onClick={() => setMode("dimensions")}
                    isActive={mode === "dimensions"}
                  >
                    <Crop size={30} className="" />
                    <span>By Pixel</span>
                  </ModeButton>
                  <ModeButton
                    disabled={isResizing || isDownloading}
                    onClick={() => setMode("percentage")}
                    isActive={mode === "percentage"}
                  >
                    <Percent />
                    <span>By Percentage</span>
                  </ModeButton>
                </div>

                {mode === "dimensions" && (
                  <div>
                    <div className="grid grid-cols-2 border-b border-gray-200 py-2.5 sm:py-5 px-2  items-center">
                      <label htmlFor="width">Width (PX)</label>
                      <input
                        id="width"
                        disabled={isResizing || isDownloading}
                        className="outline-none border border-gray-200 rounded-lg py-3 px-3"
                        required
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                      />
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-200 py-2.5 sm:py-5 px-2 items-center">
                      <label htmlFor="height">Height (PX)</label>
                      <input
                        id="height"
                        className="outline-none border border-gray-200 rounded-lg py-3 px-3"
                        disabled={isResizing || isDownloading}
                        required
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                      />
                    </div>
                    <div className="flex border-b border-gray-200 py-2.5 sm:py-5 px-2 flex-row items-center justify-between">
                      <label htmlFor="maintainAspectRatio">
                        Maintain Aspect Ratio
                      </label>
                      <input
                        disabled={isResizing || isDownloading}
                        id="maintainAspectRatio"
                        className="outline-none border border-gray-200 rounded-lg h-5 w-5"
                        required
                        type="checkbox"
                        checked={maintainAspectRatio}
                        onChange={() =>
                          setMaintainAspectRatio(!maintainAspectRatio)
                        }
                      />
                    </div>
                  </div>
                )}

                {mode === "percentage" && (
                  <div>
                    <PercentageButton
                      onClick={() => setPercentage(25)}
                      disabled={isResizing || isDownloading}
                      isActive={percentage === 25}
                    >
                      25% Smaller
                    </PercentageButton>
                    <PercentageButton
                      disabled={isResizing || isDownloading}
                      onClick={() => setPercentage(50)}
                      isActive={percentage === 50}
                    >
                      50% Smaller
                    </PercentageButton>
                    <PercentageButton
                      disabled={isResizing || isDownloading}
                      onClick={() => setPercentage(70)}
                      isActive={percentage === 70}
                    >
                      70% Smaller
                    </PercentageButton>
                  </div>
                )}
              </div>
            </ToolSettingsSidbar>
          </div>
        ) : (
          <Container
            element="div"
            className="py-10 md:py-20 flex flex-col items-center justify-center"
          >
            <button
              onClick={openExplorer}
              className="cursor-pointer inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-primary text-xl text-white font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
            >
              Select Image
            </button>
          </Container>
        )}
      </section>
    </>
  );
};

const ModeButton = ({
  onClick,
  isActive,
  children,
  disabled = false,
}: {
  children: any;
  onClick: any;
  isActive: boolean;
  disabled?: boolean;
}) => (
  <button
    onClick={disabled ? () => {} : onClick}
    className={`py-4 sm:py-10 cursor-pointer ${
      !disabled && isActive ? "text-gray-700" : "text-gray-400"
    } rounded-tl-lg rounded-bl-lg space-y-3 border ${
      !disabled && isActive ? "border-gray-300" : "border-gray-200"
    } flex flex-col items-center justify-center`}
  >
    {children}
  </button>
);

const PercentageButton = ({
  children,
  onClick,
  isActive,
  disabled = false,
}: {
  children: ReactNode;
  onClick: any;
  isActive: boolean;
  disabled?: boolean;
}) => (
  <div
    onClick={disabled ? () => {} : onClick}
    className={`flex border-b cursor-pointer border-gray-200 py-4 sm:py-5 px-2 flex-row items-center justify-between hover:bg-gray-100`}
  >
    <span>{children}</span>
    {isActive && (
      <SquareCheck
        size={25}
        className={`${disabled ? "text-gray-400" : "text-blue-500"} `}
      />
    )}
  </div>
);
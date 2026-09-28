import { ReactNode } from "react";
import { X } from "lucide-react";

import { Button } from "./Button";


type Props = {
  title?: string;
  convertBtnText?: string;
  open: boolean;
  children?: ReactNode;
  isConverting?: boolean;
  isDownloading?: boolean;
  disableConvert?: boolean;
  canDownloadZip?: boolean;
  canClearAll?: boolean;
  className?:string;
  onOpenChange?: (val: boolean) => void;
  onAddImages?: () => void;
  onConvertImages?: () => void;
  onDownloadZip?: () => void;
  onClearAll?: () => void;
};

export const ToolSettingsSidbar = ({
  title = "Image Converter",
  open,
  children,
  className,
  convertBtnText = "Convert Images",
  isConverting = false,
  isDownloading = false,
  disableConvert = false,
  canDownloadZip = false,
  canClearAll = false,
  onAddImages,
  onConvertImages,
  onDownloadZip,
  onClearAll,
  onOpenChange,
}: Props) => {
  return (
    <div
      className={`fixed transition-all duration-300 md:relative top-0 ${
        open ? "left-0 z-20" : "left-[-95%] sm:left-[-75%] md:left-0 overflow-hidden"
      } w-[90%] sm:w-[70%] md:w-auto md:col-span-4 2xl:col-span-3 bg-white pt-16 px-3 md:pt-4 md:px-5 border border-gray-200 h-full space-y-6 ${className}`}
    >
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-md sm:text-xl font-bold pb-0 sm:pb-2">{title}</h2>
        {onOpenChange && (
          <button
            onClick={() => onOpenChange(!open)}
            className="flex md:hidden text-gray-600 bg-white rounded-full p-2 shadow border border-gray-200 cursor-pointer"
          >
            <X size={18} />
          </button>
        )}
      </div>
      {children}
      <div className="space-y-0 sm:space-y-3 flex gap-3 flex-col sm:gap-0">
        <Button
          disabled={isConverting || isDownloading}
          varient="outlined"
          onClick={onAddImages}
        >
          Add more images
        </Button>
        <Button
          disabled={isConverting || isDownloading || disableConvert}
          loading={isConverting}
          onClick={onConvertImages}
        >
          {convertBtnText}
        </Button>
        {canDownloadZip && (
          <Button
            disabled={isConverting || isDownloading}
            onClick={onDownloadZip}
            loading={isDownloading}
          >
            Download Zip
          </Button>
        )}
        {canClearAll && (
          <button
            disabled={isConverting || isDownloading}
            onClick={isConverting || isDownloading ? () => {} : onClearAll}
            className="text-primary underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

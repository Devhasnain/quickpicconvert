import { ArrowRight, Download, X } from "lucide-react";
import { CSSProperties, memo, useMemo } from "react";
import Image from "next/image";


type Props = {
  f: File;
  fileSize: string;
  reducedSize?: string;
  resizedDimensions?: string;
  isDownloadAble?: boolean;
  downloadFile?: () => void;
  removeFile: () => void;
  imageClassName?: string;
  imageStyle?: CSSProperties | undefined;
};

export const ImageCard = memo(
  ({
    removeFile,
    f,
    fileSize,
    imageClassName,
    resizedDimensions,
    imageStyle,
    downloadFile,
    isDownloadAble = false,
    reducedSize,
  }: Props) => {
    const file = useMemo(() => URL?.createObjectURL(f), [f]);
    return (
      <div className="relative group h-fit p-3 bg-white border border-gray-200 hover:border-primary rounded-lg ">
        <div className="flex items-center gap-2 justify-end lg:flex absolute top-2 right-2 z-10">
          {downloadFile && isDownloadAble && (
            <button
              onClick={downloadFile}
              className="flex bg-gray-100 hover:bg-gray-200 cursor-pointer  border border-gray-200 rounded-full  h-8 w-8 flex-col items-center justify-center "
            >
              <Download size={18} />
            </button>
          )}
          <button
            onClick={removeFile}
            className="flex bg-gray-100 hover:bg-gray-200 cursor-pointer  border border-gray-200 rounded-full  h-8 w-8 flex-col items-center justify-center "
          >
            <X size={18} />
          </button>
        </div>
        <div
          title={f.name}
          className="overflow-hidden h-60  flex flex-col items-center justify-center"
        >
          <Image
            alt="Selected image"
            height={300}
            width={300}
            className={`h-full w-full object-contain rounded-lg ${imageClassName}`}
            src={file}
            style={imageStyle}
          />
        </div>
        <div className="bg-white pt-1.5 border-t border-gray-200 space-y-1">
          <div className="flex flex-row items-center gap-5">
            <div className="px-2 font-medium py-0.5 text-xs text-white w-fit bg-primary rounded-full flex flex-row items-center gap-2">
              <span>{fileSize}</span>
              {reducedSize ? (
                <>
                  <ArrowRight size={15} />
                  <span>{reducedSize}</span>
                </>
              ) : (
                ""
              )}
            </div>
            {resizedDimensions && (
              <div className="px-2 font-medium py-0.5 text-xs text-white w-fit bg-primary rounded-full flex flex-row items-center gap-2">
                <span>{resizedDimensions}</span>
              </div>
            )}
          </div>

          <span className="line-clamp-1 w-full text-sm">{f.name}</span>
        </div>
      </div>
    );
  }
);

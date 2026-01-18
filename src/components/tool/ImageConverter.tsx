import { convertImage, downloadAsZip, downloadSingleFile } from "@/lib/utils";
import { Download, Plus, X } from "lucide-react";
import React, { ChangeEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";

import ImagePreviewCard from "./ImagePreviewCard";
import UploadImageBtn from "./UploadImageBtn";
import { Button } from "../ui/button";


type Props = {
  title: string;
  accept: "png" | "jpeg" | "webp" | "jpg" | string;
  output: "png" | "jpeg" | "webp" | "jpg";
};

const ImageConverter = ({ accept, output }: Props) => {
  const [files, setFiles] = React.useState<File[] | []>([]);
  const [results, setResults] = React.useState<any[] | []>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = React.useState(false);

  const openExplorer = () => {
    inputRef.current?.click();
  };

  const handleAddFiles = (e: ChangeEvent<HTMLInputElement>) => {
    let newFiles = e.target.files;
    if (files?.length) {
      setFiles([...Array.from(newFiles || []), ...files]);
    } else {
      setFiles(Array.from(newFiles || []));
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleReset = () => {
    setFiles([]);
    setResults([]);
  };

  const convertToPng = async () => {
    try {
      setLoading(true);
      const convertedFiles = await convertImage({
        files: files as File[],
        mime: output,
      });

      setResults(convertedFiles);
      toast.success("Images converted successfully!");
      setLoading(false);
    } catch (error) {
      toast.error("An error occurred during conversion.");
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (results.length === 1) {
      downloadSingleFile(results[0]);
      setResults([]);
    } else if (results.length > 1) {
      downloadAsZip(results);
      setResults([]);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleAddFiles}
        className="hidden"
      />
      {!files?.length ? <UploadImageBtn onClick={openExplorer} /> : ""}
      {files.length ? (
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex flex-row items-center gap-3 pb-4 flex-wrap">
            {files?.map((file, index) => (
              <ImagePreviewCard
                key={index}
                file={file}
                onClick={() => handleRemoveFile(index)}
              />
            ))}
          </div>
          <div className="flex flex-row items-center gap-2">
            <Button
              onClick={convertToPng}
              disabled={!files?.length || loading}
              className="w-full"
            >
              Convert
            </Button>
            <Button
              onClick={openExplorer}
              variant="outline"
              className="min-w-10"
              size="icon"
            >
              <Plus className="w-4 h-4" />
            </Button>

            {files?.length ? (
              <Button
                onClick={handleReset}
                variant="outline"
                className="min-w-10"
                size="icon"
              >
                <X className="w-4 h-4" />
              </Button>
            ) : (
              ""
            )}

            {results?.length ? (
              <Button
                onClick={handleDownload}
                variant="outline"
                className="min-w-10"
                size="icon"
              >
                <Download className="w-4 h-4" />
              </Button>
            ) : (
              ""
            )}
          </div>
          {results.length ? (
            <div className="">
              {results.map((file: any, index: number) => (
                <div
                  key={index}
                  className="mt-4 p-4 border border-border rounded-md flex flex-row gap-3 items-center"
                >
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    className="w-20 h-16 rounded-md object-cover overflow-hidden dashedBorder"
                    src={file?.url}
                  />
                  <div className="w-full">
                    <p className="font-medium line-clamp-1">{file?.name}</p>
                    {/* <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p> */}
                  </div>
                  <Button
                    onClick={() => handleRemoveFile(index)}
                    variant="outline"
                    size="icon"
                    className="min-w-10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ImageConverter;

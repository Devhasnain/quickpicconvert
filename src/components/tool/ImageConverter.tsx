import { convertImage, downloadAsZip, downloadSingleFile } from "@/lib/utils";
import { Download, Plus, X, icons } from "lucide-react";
import React, { ChangeEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "../ui/button";


type Props = {
  title: string;
  accept: "png" | "jpeg" | "webp" | "jpg" | string;
  output: "png" | "jpeg" | "webp" | "jpg";
};

const ImageConverter = ({ title, accept, output }: Props) => {
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
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleReset = () => {
    setFiles([]);
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
      <div className="bg-card rounded-2xl border border-border p-6">
        {!files.length ? (
          <button
            onClick={openExplorer}
            className="w-full h-[35vh] flex flex-col items-center justify-center rounded-md gap-2"
          >
            <icons.Image className="w-12 h-12 text-primary/80" />
            <Button size="lg">Choose images</Button>
            <span className="text-primary/80">Click to upload images</span>
          </button>
        ) : (
          <>
            <div className="flex flex-row justify-center">
              <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full mb-6">
                {title}
              </span>
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
            <div className="">
              {files.map((file: File, index: number) => (
                <div
                  key={index}
                  className="mt-4 p-4 border border-border rounded-md flex flex-row gap-3 items-center"
                >
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    className="w-10 h-10 rounded-md object-cover overflow-hidden border"
                    src={URL?.createObjectURL(file)}
                  />
                  <div className="w-full">
                    <p className="font-medium line-clamp-1">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
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
          </>
        )}

        {/* <div className="mt-4">
          <span className="font-semibold block">Similar tools</span>
          <div className="flex flex-row items-center gap-5">
            {tools
              .filter((tool) => tool.category === "Media")
              .map((tool) => {
                return (
                  <Fragment key={tool.id}>
                    {pathname !== tool.id && (
                      <Link
                        className="underline text-sm font-medium text-primary"
                        href={tool.id}
                      >
                        {tool.title}
                      </Link>
                    )}
                  </Fragment>
                );
              })}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ImageConverter;

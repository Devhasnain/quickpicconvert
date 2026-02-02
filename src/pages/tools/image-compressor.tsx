import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { compressImages, downloadAsZip, downloadSingleFile, getOutputFormateLabel, } from "@/lib/utils";
import { Download, MoveRight, Plus, X, icons } from "lucide-react";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import ImagePreviewCard from "@/components/tool/ImagePreviewCard";
import UploadImageBtn from "@/components/tool/UploadImageBtn";
import ToolPageLayout from "@/components/tool/ToolPageLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";


export default function ImageCompressor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[] | []>([]);
  const [results, setResults] = useState<
    | {
        name: string;
        url: string;
        size: number;
        originalSize: number;
      }[]
    | []
  >([]);
  const [isConverting, setIsConverting] = useState(false);

  const [outputFormat, setOutputFormat] = useState<
    "image/webp" | "image/jpeg" | "image/png"
  >("image/webp");
  const [quality, setQuality] = useState(0.7);
  const [maxWidth, setMaxWidth] = useState(1280);
  const [background, setBackground] = useState("#ffffff");

  const openExplorer = () => {
    inputRef.current?.click();
  };

  const handleFilesOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newFiles = e.target.files;
    if (files?.length) {
      setFiles([...Array.from(newFiles || []), ...files]);
    } else {
      setFiles(Array.from(newFiles || []));
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResults([]);
  };

  const handleCompress = async () => {
    try {
      setIsConverting(true);
      const convertedFiles = await compressImages({
        files: files as File[],
        maxWidth,
        background,
        quality,
        outputFormat,
      });
      setResults((pre) => [...pre, ...convertedFiles]);
      setIsConverting(false);
      toast.success("Images compressed successfully.");
    } catch (error: any) {
      setIsConverting(false);
      toast.error(error?.message);
    }
  };

  const handleRemoveResult = useCallback(
    (index: number) => {
      let updatedArr = results.filter((_, id) => id !== index);
      setResults(updatedArr);
    },
    [results]
  );

  const handleRemoveFile = useCallback(
    (index: number) => {
      let updatedArr = files.filter((_, id) => id !== index);
      setFiles(updatedArr);
    },
    [files]
  );

  const handleDownload = () => {
    if (results.length === 1) {
      downloadSingleFile(results[0]);
    } else if (results.length > 1) {
      downloadAsZip(results);
    }
  };

  return (
    <>
      <ToolPageLayout>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg"
          onChange={handleFilesOnChange}
          className="hidden"
        />
        {!files?.length ? <UploadImageBtn onClick={openExplorer} /> : ""}
        {files?.length ? (
          <div className="bg-card rounded-2xl border border-border p-6">
            <>
              <div className="pb-5">
                <h3 className="text-lg font-medium">Settings</h3>
                <Separator />
              </div>

              <div className="grid grid-cols-2 gap-5 items-center pb-5">
                <div className="flex flex-col gap-1">
                  <Label>Output formate</Label>
                  <Select
                    value={outputFormat}
                    onValueChange={(
                      e: "image/webp" | "image/jpeg" | "image/png"
                    ) => setOutputFormat(e)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Output">
                        {getOutputFormateLabel(outputFormat)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image/webp">
                        WEBP (Best compression)
                      </SelectItem>
                      <SelectItem value="image/jpeg">JPEG</SelectItem>
                      <SelectItem value="image/png">PNG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {outputFormat !== "image/png" && (
                  <div className="flex flex-col gap-1">
                    <Label>Quality: {Math.round(quality * 100)}%</Label>
                    <Input
                      type="range"
                      min="0.4"
                      max="1"
                      step="0.05"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <Label>Max Width (px)</Label>
                  <Input
                    placeholder="Width"
                    type="number"
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(Number(e.target.value))}
                  />
                </div>

                {outputFormat === "image/jpeg" && (
                  <div className="flex flex-col gap-1">
                    <Label>Background Color</Label>
                    <Input
                      type="color"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-row items-center gap-2 flex-wrap pb-4">
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
                  onClick={handleCompress}
                  disabled={!files?.length || isConverting}
                  className="w-full"
                >
                  Compress
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
            </>
            {results?.length ? (
              <div className="pb-5">
                {results?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="mt-4 p-4 border border-border rounded-md flex flex-row gap-3 items-center"
                  >
                    <Image
                      alt=""
                      width={10}
                      height={10}
                      className="w-20 h-14 rounded-md object-cover overflow-hidden border"
                      src={item?.url}
                    />
                    <div className="w-full">
                      <p className="font-medium line-clamp-1">{item?.name}</p>
                      <div className="flex flex-row items-center gap-2">
                        <span className="text-sm text-red-500">
                          {item?.originalSize} KB
                        </span>
                        <MoveRight className="w-5 h-5" />
                        <span className="text-sm text-green-500">
                          {item?.size} KB
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRemoveResult(index)}
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
              <></>
            )}
          </div>
        ) : (
          ""
        )}
      </ToolPageLayout>
    </>
  );
}

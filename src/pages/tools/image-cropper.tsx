import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { applyFilters, getImageFilterLabel, resizeImage } from "@/lib/utils";
import ToolPageLayout from "@/components/tool/ToolPageLayout";
import { Separator } from "@/components/ui/separator";
import { Download, icons, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";


const ImageCropper = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [filter, setFilter] = useState("none");

  const openExplorer = () => {
    inputRef.current?.click();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      if (inputRef?.current) inputRef.current.value = "";
    }
  };

  const handleProcess = async () => {
    if (!file) return;

    let output = await resizeImage(file, width, height);

    if (filter !== "none") {
      output = await applyFilters(file, filter);
    }

    setResult(output);
  };

  const handleDownload = () => {
    if (!result) return;

    const a = document.createElement("a");
    a.href = result;
    a.download = "resized-image.png";
    a.click();
  };

  useEffect(() => {
    if (file) {
      handleProcess();
    }
  }, [file, width, height, filter]);

  return (
    <>
      <PageSEO
        title="Image Cropper – Crop Images Online Free"
        description="Crop images online using a fast and private browser-based image cropper."
        canonical="https://quickpicconvert.com/tools/image-cropper"
        keywords="image cropper, image cropper online, image crop online, image crop tool, image resize, image cropper free, image resizer, image resizer tool"
      />
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleUpload}
      />

      <ToolPageLayout>
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="pb-5">
            <h3 className="text-lg font-medium">Settings</h3>
            <Separator />
          </div>

          <div className="grid grid-cols-2 gap-4 pb-5">
            <div className="flex flex-col gap-1">
              <Label>Width</Label>
              <Input
                disabled={!file}
                type="number"
                max={1200}
                value={width}
                maxLength={4}
                onChange={(e) => setWidth(+e.target.value)}
                placeholder="Width"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Height</Label>
              <Input
                disabled={!file}
                type="number"
                value={height}
                onChange={(e) => setHeight(+e.target.value)}
                placeholder="Height"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Filter</Label>
              <Select
                disabled={!file}
                value={filter}
                onValueChange={(e) => setFilter(e)}
              >
                <SelectTrigger>
                  <SelectValue>{getImageFilterLabel(filter)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Filter</SelectItem>
                  <SelectItem value="grayscale(100%)">Grayscale</SelectItem>
                  <SelectItem value="contrast(120%)">Contrast</SelectItem>
                  <SelectItem value="brightness(120%)">Brightness</SelectItem>
                  <SelectItem value="sepia(100%)">Sepia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {!file && (
            <div
              onClick={openExplorer}
              className="w-full h-[35vh] flex border border-primary/80 border-dashed mb-5 flex-col items-center justify-center rounded-md gap-2"
            >
              <icons.Image className="w-12 h-12 text-primary/80" />
              <Button size="lg">Choose image</Button>
              <span className="text-primary/80">Click to upload image</span>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="w-full border rounded-md h-[60vh] flex flex-col items-center justify-center">
                <Image
                  height={0}
                  width={0}
                  alt="image-preview"
                  src={result}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex flex-row items-center justify-between gap-3">
                <Button
                  onClick={handleDownload}
                  size={"icon"}
                  className="w-full flex flex-row items-center justify-center gap-2"
                >
                  Download <Download />
                </Button>
                <Button
                  onClick={openExplorer}
                  variant={"outline"}
                  type="button"
                  size={"icon"}
                >
                  <Plus />{" "}
                </Button>
              </div>
            </div>
          )}
        </div>
      </ToolPageLayout>
    </>
  );
};

export default ImageCropper;

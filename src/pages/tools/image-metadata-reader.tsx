import { exportAsCSV, exportAsHTML, exportAsTXT } from "@/lib/utils";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ToolPageLayout from "@/components/tool/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import { icons, X } from "lucide-react";
import EXIFReader from "exifreader";
import Image from "next/image";


const ImageMetadataReader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<any>(null);

  const openExplorer = () => {
    inputRef.current?.click();
  };

  const handleFilesOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleReadFileMeta = async () => {
    try {
      if (!file) {
        throw new Error("Please select an image.");
      }
      let tags = EXIFReader.load(await file.arrayBuffer());
      setMetadata(tags);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetState = () => {
    setFile(null);
    setMetadata(null);
  };

  const downloadAsTXT = () => {
    exportAsTXT(
      metadata,
      file?.name?.replace(/\.[^/.]+$/, `.txt`) || "metadata.txt"
    );
  };

  const downloadAsCSV = () => {
    exportAsCSV(
      metadata,
      file?.name?.replace(/\.[^/.]+$/, `.csv`) || "metadata.txt"
    );
  };

  const downloadAsHTML = () => {
    exportAsHTML(
      metadata,
      file?.name?.replace(/\.[^/.]+$/, `.html`) || "metadata.txt"
    );
  };

  useEffect(() => {
    if (file) {
      handleReadFileMeta();
    }
  }, [file]);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple={false}
        accept="
    image/jpeg,
    image/jpg,
    image/png,
    image/webp,
    image/tiff,
    image/heic,
    image/heif
  "
        onChange={handleFilesOnChange}
        className="hidden"
      />
      <PageSEO
        title="Image Metadata Reader Online - View EXIF Data & Image Info"
        description="View and analyze image metadata online, including EXIF data, camera details, resolution, and file information. Fast, secure, and browser-based image metadata viewer."
        keywords="image metadata reader, exif viewer, photo metadata online, image info viewer, online exif reader, check image details, analyze image metadata"
        canonical="https://quickpicconvert.com/image-metadata-reader"
      />
      <ToolPageLayout>
        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          {file && (
            <div className="w-full border rounded-md h-[40vh] flex flex-col items-center justify-center">
              <Image
                height={0}
                width={0}
                alt="image-preview"
                src={URL.createObjectURL(file)}
                className="object-contain w-full h-full"
              />
            </div>
          )}
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

          {file && (
            <>
              <div className="flex flex-row gap-2 items-center">
                <Button onClick={openExplorer} className="w-full">
                  Choose a different image
                </Button>
                <Button onClick={handleResetState} size={"icon"}>
                  <X />
                </Button>
              </div>

              <div className="flex flex-row items-center gap-3">
                <span>Save this data as</span>
                <div className="flex flex-row gap-2">
                  <Button title="TXT" onClick={downloadAsTXT}>TXT</Button>
                  <Button title="HTML" onClick={downloadAsHTML}>HTML</Button>
                  <Button title="CSV" onClick={downloadAsCSV}>CSV</Button>
                </div>
              </div>
            </>
          )}

          {metadata && (
            <table className="w-full table-auto border-collapse border border-border">
              <thead>
                <tr> </tr>
              </thead>
              <tbody>
                {metadata ? (
                  Object?.entries(metadata).map(([key, value]: any) => (
                    <tr key={key} className="border-b border-border">
                      <td className="px-4 py-2 font-medium text-left align-top border-r border-border w-1/3">
                        {key}
                      </td>
                      <td className="px-4 py-2 text-left align-top">
                        {value?.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-4 py-2 text-center">
                      No metadata available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </ToolPageLayout>
    </>
  );
};

export default ImageMetadataReader;

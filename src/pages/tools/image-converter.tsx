import { downloadSingleFile, formatBytes, getCompressedPercent, } from "@/lib/utils";
import ImageConverterToolBar from "@/components/tool/ImageConverterToolBar";
import { useImageConverterStore } from "@/store/ImageConverterStore";
import { ChevronRight, Download, Sparkles, X } from "lucide-react";
import UploadImageBtn from "@/components/tool/UploadImageBtn";
import ToolPageLayout from "@/components/tool/ToolPageLayout";
import HeroBackground from "@/components/tool/HeroBackground";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import { ChangeEvent, useRef } from "react";
import content from "@/data/content.json";
import { tools } from "@/data/tool";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";


const ImageConverter = ({ pageData }: { pageData: string }) => {
  const {
    previewUrl,
    loading,
    setOriginalImage,
    setOriginalSize,
    originalSize,
    outputSize,
    height,
    width,
    fileName,
    setFileName,
    outputFormat,
    resetStore,
  } = useImageConverterStore();
  const pageContent = JSON.parse(pageData);
  const inputRef = useRef<HTMLInputElement>(null);

  const openExplorer = () => {
    inputRef.current?.click();
  };

  const handleDownload = async () => {
    if (!previewUrl) return;
    try {
      downloadSingleFile({
        name: `${fileName}-${width}*${height}.${outputFormat?.split("/")[1]}`,
        url: previewUrl,
      });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleFileOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setOriginalImage(URL.createObjectURL(files[0]));
      setFileName(files[0].name.replace(/\.[^/.]+$/, ""));
      setOriginalSize(files[0].size);
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  if (!pageContent?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Button asChild>
            <Link href="/tools">Back to Tools</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageSEO
        title={content.imageConverter.seo.title}
        description={content.imageConverter.seo.description}
        keywords={content.imageConverter.seo.keywords}
        canonical={content.imageConverter.seo.canonical}
      />
      <ToolPageLayout
        containerClassName="max-w-full"
        mainContainerClassName="max-w-full lg:px-0 sm:px-0 px-0"
        pageHero="custom"
      >
        <input
          ref={inputRef}
          type="file"
          multiple={false}
          onChange={handleFileOnChange}
          className="hidden"
          accept="image/png,image/jpeg,image/webp"
        />
        <HeroBackground>
          {previewUrl && (
            <div className="flex flex-col lg:flex-row items-center justify-end gap-8 lg:h-screen pt-16 md:pt-0">
              <div className="w-full lg:w-6/12 flex flex-col items-center justify-center h-[70vh] lg:h-[70%] lg:overflow-hidden z-[9999] relative">
                {loading && (
                  <div className="absolute flex flex-col items-center justify-center backdrop-blur-sm w-full h-full">
                    <Image
                      alt=""
                      src={"/logo-cropped.png"}
                      height={100}
                      width={100}
                      className="animate-pulse"
                    />
                  </div>
                )}
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <ImageConverterToolBar openExplorer={openExplorer} />
            </div>
          )}

          {!previewUrl && (
            <div className="relative z-10 text-center max-w-7xl mx-auto pt-16 sm:pt-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">
                  100% Free, No Sign-up Required
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 px-4 sm:px-0 ">
                {pageContent?.title}
              </h1>

              <p className="text-lg text-primary-foreground/80 mb-6 max-w-3xl mx-auto px-4 sm:px-0">
                {pageContent?.description}
              </p>

              <UploadImageBtn onClick={openExplorer} />
            </div>
          )}

          {previewUrl && (
            <div className="absolute flex flex-row items-center gap-3 bottom-3 left-3">
              <div className=" items-center  flex flex-row bg-white px-3 py-2 gap-3 rounded-md">
                <span className="text-xl font-medium">
                  {formatBytes(originalSize)}
                </span>
                {outputSize ? (
                  <>
                    <ChevronRight color="green" />

                    <div className="flex flex-row items-center gap-2">
                      <span className="text-xl font-bold">
                        {getCompressedPercent(originalSize, outputSize)}%
                      </span>
                      <span className="text-xl font-medium">
                        {formatBytes(outputSize)}
                      </span>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>

              <Button
                onClick={resetStore}
                variant={"secondary"}
                size={"icon"}
              >
                <X className="text-primary" />
              </Button>
              <Button
                onClick={handleDownload}
                variant={"secondary"}
                size={"icon"}
              >
                <Download className="text-primary" />
              </Button>
            </div>
          )}
        </HeroBackground>
      </ToolPageLayout>
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      pageData: JSON.stringify(
        tools.find((item) => item.id === "image-converter") || ""
      ),
    },
  };
};

export default ImageConverter;

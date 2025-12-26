import ToolPageLayout from "@/components/tool/ToolPageLayout";
import { ChangeEvent, useRef, useState } from "react";
import { Check, Copy, icons } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import Image from "next/image";
import { toast } from "sonner";


const ImageToBase64 = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const openExplorer = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      if (!e.target.files?.length) {
        throw new Error("Unknown error! Please try again.");
      }

      setFile(e.target.files[0]);

      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.result) setText(reader.result?.toString());
      };
      reader.onerror = (error) => {
        throw new Error("Error converting image to base64:" + error);
      };

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <>
      <PageSEO
        title="Image to Base64 Converter – Encode Images Online"
        description="Convert images to Base64 strings or Data URLs instantly. Perfect for developers embedding images into HTML, CSS, JSON, or APIs."
        canonical="https://quickpicconvert.com/tools/image-to-base64"
        keywords="image to base64, convert image to base64, base64 image encoder, image to data url"
      />

      <ToolPageLayout>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <div
            onClick={!file && !loading ? openExplorer : () => {}}
            className="w-full h-[35vh] overflow-hidden flex border border-primary/80 border-dashed mb-5 flex-col items-center justify-center rounded-md gap-2"
          >
            {file ? (
              <Image
                height={100}
                width={100}
                alt="image-preview"
                src={URL.createObjectURL(file)}
                className="w-full h-full object-contain"
              />
            ) : (
              <>
                <icons.Image className="w-12 h-12 text-primary/80" />
                <Button size="lg">Choose image</Button>
                <span className="text-primary/80">Click to upload image</span>
              </>
            )}
          </div>

          {text && (
            <>
              <div className="h-[40vh] w-full rounded-md border border-primary/80 overflow-y-auto p-6 text-wrap overflow-x-hidden break-words">
                {text}
              </div>

              <div className="flex flex-row items-center justify-between gap-3">
                <Button
                  disabled={loading}
                  onClick={openExplorer}
                  className="w-full"
                  size={"icon"}
                >
                  Choose different file
                </Button>
                <Button onClick={handleCopy} size={"icon"} variant={"outline"}>
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </ToolPageLayout>
    </>
  );
};

export default ImageToBase64;

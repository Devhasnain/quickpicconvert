import { ChangeEvent, useEffect, useRef, useState } from "react";
import UploadImageBtn from "@/components/tool/UploadImageBtn";
import ToolPageLayout from "@/components/tool/ToolPageLayout";
import { getFileFromClipboard } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Copy, X } from "lucide-react";
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files?.length) {
        throw new Error("Unknown error! Please try again.");
      }

      setFile(e.target.files[0]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleReadFile = async () => {
    try {
      if (!file) throw new Error("Please upload the image again.");
      setLoading(true);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) setText(reader.result?.toString());
      };
      reader.onerror = (error) => {
        throw new Error("Error converting image to base64:" + error);
      };
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
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

  const handleReset = () => {
    setText("");
    setFile(null);
    setCopied(false);
  };

  useEffect(() => {
    const handleFile = (e: ClipboardEvent) => {
      const response = getFileFromClipboard(e);
      setFile(response);
    };
    window?.addEventListener("paste", handleFile);
    return () => window?.removeEventListener("paste", getFileFromClipboard);
  }, []);

  useEffect(() => {
    if (file) handleReadFile();
  }, [file]);

  return (
    <>
      <ToolPageLayout>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {!file && <UploadImageBtn onClick={openExplorer} />}
        {file && text && (
          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <div className="h-[40vh] w-full rounded-md border border-primary/80 overflow-y-auto p-6 text-wrap overflow-x-hidden break-words">
              {text}
            </div>

            <div className="w-24 h-24 overflow-hidden flex border border-primary/80 border-dashed mb-5 flex-col items-center justify-center rounded-md gap-2">
              <Image
                height={100}
                width={100}
                alt="image-preview"
                src={URL.createObjectURL(file)}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-row items-center justify-between gap-2">
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
              <Button onClick={handleReset} size={"icon"} variant={"outline"}>
                <X />
              </Button>
            </div>
          </div>
        )}
      </ToolPageLayout>
    </>
  );
};

export default ImageToBase64;

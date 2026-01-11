import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ArrowDown, Check, Copy, icons, X } from "lucide-react";
import ToolPageLayout from "@/components/tool/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import Tesseract from "tesseract.js";
import Image from "next/image";
import { toast } from "sonner";


const ImageToText = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const openExplorer = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        setText("");
        setProgress(0);
        inputRef.current && inputRef.current.value;
      }
    }
  };

  const convertImageToText = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const result = await Tesseract.recognize(image, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.floor(m.progress * 100)); // Track real-time progress
          }
        },
      });
      setText(result.data.text);
    } catch (error) {
      console.error("OCR Error:", error);
      alert("Failed to read image.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Password copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const clearState = () => {
    setImage(null);
    setText("");
    setProgress(0);
    setLoading(false);
  }

  useEffect(() => {
    if (image) {
      convertImageToText();
    }
  }, [image]);

  return (
    <ToolPageLayout>
      <PageSEO
        title="Image to Text Converter – Extract Text from Images Online (OCR)"
        description="Convert images to editable text online using OCR. Extract text from photos, screenshots, and scanned documents securely in your browser."
        canonical="https://quickpicconvert.com/tools/image-to-text"
        keywords="image to text, ocr image to text, extract text from image, photo to text, image ocr online"
      />
      <input
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
      />
      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <div
          onClick={!image && !loading ? openExplorer : () => {}}
          className="w-full h-[35vh] overflow-hidden flex border border-primary/80 border-dashed mb-5 flex-col items-center justify-center rounded-md gap-2"
        >
          {image ? (
            <Image
              height={100}
              width={100}
              alt="image-preview"
              src={URL.createObjectURL(image)}
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

        {loading && progress && (
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-green-500">({progress}) %</span>
            <ArrowDown className="animate-bounce" />
          </div>
        )}

        {text && (
          <>
            <div className="h-[40vh] w-full rounded-md border border-primary/80 overflow-y-auto p-6">
              <span>{text?.length > 0 ? text : "Reading image..."}</span>
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
              <Button
                onClick={clearState}
                size={"icon"}
                variant={"outline"}
              >
                <X />
              </Button>
              <Button
                onClick={copyToClipboard}
                size={"icon"}
                variant={"outline"}
              >
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
  );
};

export default ImageToText;

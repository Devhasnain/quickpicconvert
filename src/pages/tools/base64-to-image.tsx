import ToolPageLayout from "@/components/tool/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";


const Base64ToImage = () => {
  const [base64, setBase64] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const handleConvert = () => {
    if (!base64) return toast.error("Paste a Base64 string first!");
    try {
      const src = base64.startsWith("data:image/")
        ? base64
        : `data:image/png;base64,${base64}`;
      setImgSrc(src);
      toast.success("Image converted successfully.");
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const handleDownload = () => {
    if (!imgSrc) return;
    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = "image.png";
    link.click();
  };

  useEffect(() => {
    if (base64 && base64?.length > 20) {
      handleConvert();
    }else{
      setImgSrc("")
    }
  }, [imgSrc, base64]);

  return (
    <>
      <ToolPageLayout>
        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <textarea
            className="w-full border p-3 rounded-md outline-none"
            rows={6}
            placeholder="Paste your Base64 string here"
            value={base64}
            onChange={(e) => setBase64(e.target.value)}
          ></textarea>

          {imgSrc && (
            <>
              <div className="h-56 border rounded-md w-full overflow-hidden flex flex-col items-center justify-center">
                <Image
                  alt="base64-image-preview"
                  src={imgSrc}
                  height={100}
                  width={100}
                  className="w-full h-full object-contain"
                />
              </div>
              <Button className="w-full" onClick={handleDownload}>
                Download
              </Button>
            </>
          )}
        </div>
      </ToolPageLayout>
    </>
  );
};

export default Base64ToImage;

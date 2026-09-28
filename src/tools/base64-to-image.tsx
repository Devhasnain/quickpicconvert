import { Container, HiddenFileInput } from "@/components";
import { ChangeEvent, useRef, useState } from "react";
import { useImageToBase64Store } from "@/store";
import { Check, Copy } from "lucide-react";


export const Base64ToImageTool = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { file, addFile, resetStore, rawImage, setRawImage } =
    useImageToBase64Store();

  const openExplorer = () => {
    inputRef.current?.click();
  };

  const handleFilesOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (files?.length) {
      addFile(files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        if (reader.result) setRawImage(reader.result?.toString());
      };
      reader.onerror = (error) => {
        throw new Error("Error converting image to base64:" + error);
      };
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleCopy = () => {
    if (rawImage) {
      navigator.clipboard.writeText(rawImage).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <>
      <HiddenFileInput
        ref={inputRef}
        multiple={false}
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFilesOnChange}
      />

      <section className="bg-gray-100">
        {file ? (
          <div className="h-screen grid grid-cols-1 sm:grid-cols-2 overflow-hidden relative">
            <div className="h-full overflow-y-auto px-10 sm:px-2.5 py-5 sm:py-10 flex flex-col">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-full h-full overflow-y-auto relative sm:top-0 bg-white p-3 sm:p-5 border border-gray-200 space-y-3">
              <h2 className="text-md sm:text-xl font-bold pb-0 sm:pb-2">
                Image Meta Data
              </h2>

              {rawImage && (
                <div className="relative border wrap-break-word text-black border-gray-200 rounded-lg p-8 h-64 overflow-y-auto">
                  <button onClick={handleCopy} className="absolute top-2 right-2 bg-white rounded-lg border text-gray-600 border-gray-200 shadow hover:bg-gray-50 p-2 cursor-pointer">
                    {copied ? (
                      <Check size={20} />
                    ) : (
                      <Copy size={20} />
                    )}
                  </button>
                  {rawImage}
                </div>
              )}

              <div className="space-y-0 sm:space-y-3 flex flex-row items-center justify-center gap-3 sm:flex-col sm:gap-0">
                <button
                  onClick={openExplorer}
                  className="flex cursor-pointer w-full justify-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                >
                  Change Image
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Container
            element="div"
            className="py-10 md:py-20 flex flex-col items-center justify-center"
          >
            <button
              onClick={openExplorer}
              className="cursor-pointer inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-primary text-xl text-white font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
            >
              Select Image
            </button>
          </Container>
        )}
      </section>
    </>
  );
};
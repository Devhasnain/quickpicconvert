import { exportAsCSV, exportAsHTML, exportAsTXT } from "@/lib/utils";
import { HiddenFileInput, SelectImageButton } from "@/components";
import { ChangeEvent, useEffect, useRef } from "react";
import { useImageMetadataReader } from "@/store";
import EXIFReader from "exifreader";


export const ImageMetadataReaderTool = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { file, addFile, imageMeta, setImageMeta, resetStore } =
    useImageMetadataReader();

  const openExplorer = () => {
    inputRef.current?.click();
  };

  const handleFilesOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (files?.length) {
      addFile(files[0]);
      if (!files[0]) return;
      const tags = EXIFReader.load(await files[0].arrayBuffer());
      setImageMeta(tags);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const exportMetaData = (key: "TXT" | "CSV" | "HTML") => {
    switch (key) {
      case "TXT":
        exportAsTXT(
          imageMeta,
          file?.name?.replace(/\.[^/.]+$/, `.txt`) ||
            "quickpicconvert-image-metadata.txt"
        );
        break;
      case "CSV":
        exportAsCSV(
          imageMeta,
          file?.name?.replace(/\.[^/.]+$/, `.csv`) ||
            "quickpicconvert-image-metadata.csv"
        );
        break;
      case "HTML":
        exportAsHTML(
          imageMeta,
          file?.name?.replace(/\.[^/.]+$/, `.html`) ||
            "quickpicconvert-image-metadata.html"
        );
        break;
    }
  };

  useEffect(() => {
    return () => resetStore();
  }, []);

  return (
    <>
      <HiddenFileInput
        ref={inputRef}
        multiple={false}
        accept="image/jpeg,image/jpg,image/png,image/webp,image/tiff,image/heic,image/heif"
        onChange={handleFilesOnChange}
      />

      <section className="bg-gray-100">
        {file ? (
          <div className="h-full sm:h-screen grid grid-cols-1 sm:grid-cols-2 overflow-hidden relative items-start">
            <div className="h-screen sm:h-full overflow-y-auto px-10 sm:px-2.5 py-5 sm:py-10 flex flex-col">
              <img
                src={URL?.createObjectURL(file) || ""}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-full h-full overflow-y-auto relative sm:top-0 bg-white p-3 sm:p-5 border border-gray-200 space-y-3">
              <h2 className="text-md sm:text-xl font-bold pb-0 sm:pb-2">
                Image Meta Data
              </h2>

              <div className="space-y-0 sm:space-y-3 flex flex-row items-center justify-center gap-3 sm:flex-col sm:gap-0">
                <button
                  onClick={openExplorer}
                  className="flex cursor-pointer w-full justify-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                >
                  Change Image
                </button>
              </div>

              {imageMeta && (
                <div>
                  <div className="flex flex-row items-center gap-5 mb-3">
                    <span className="text-sm">Export as:</span>
                    <button className="bg-primary cursor-pointer px-5 py-2 rounded-lg text-white" onClick={()=>exportMetaData("TXT")}>TXT</button>
                    <button className="bg-primary cursor-pointer px-5 py-2 rounded-lg text-white" onClick={()=>exportMetaData("CSV")}>CSV</button>
                    <button className="bg-primary cursor-pointer px-5 py-2 rounded-lg text-white" onClick={()=>exportMetaData("HTML")}>HTML</button>
                  </div>
                  <table className="w-full table-auto border-collapse border border-border">
                    <thead>
                      <tr> </tr>
                    </thead>
                    <tbody>
                      {imageMeta ? (
                        Object?.entries(imageMeta).map(([key, value]: any) => (
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
                </div>
              )}
            </div>
          </div>
        ) : (
          <SelectImageButton onClick={openExplorer} />
        )}
      </section>
    </>
  );
};
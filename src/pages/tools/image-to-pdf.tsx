import ImageToPdfConverter from "@/components/tool/ImageToPdfConverter";
import ToolPageLayout from "@/components/tool/ToolPageLayout";


const ImageToPdf = () => {
  return (
    <ToolPageLayout containerClassName="max-w-4xl">
      <ImageToPdfConverter />
    </ToolPageLayout>
  );
};

export default ImageToPdf;

import ImageToPdfConverter from "@/components/tool/ImageToPdfConverter";
import ToolPageLayout from "@/components/tool/ToolPageLayout";


const PngToPdf = () => {
  return (
    <ToolPageLayout containerClassName="max-w-4xl">
      <ImageToPdfConverter />
    </ToolPageLayout>
  );
};

export default PngToPdf;

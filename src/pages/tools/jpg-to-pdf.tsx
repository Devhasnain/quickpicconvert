import ImageToPdfConverter from "@/components/tool/ImageToPdfConverter";
import ToolPageLayout from "@/components/tool/ToolPageLayout";


const JpgToPdf = () => {
  return (
    <ToolPageLayout containerClassName="max-w-4xl">
      <ImageToPdfConverter />
    </ToolPageLayout>
  );
};

export default JpgToPdf;

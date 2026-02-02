import ToolPageLayout from "@/components/tool/ToolPageLayout";
import ImageConverter from "@/components/tool/ImageConverter";


const PngToWebp = () => {
  return (
      <ToolPageLayout>
        <ImageConverter accept="image/png" output="webp" title="Png to Webp" />
      </ToolPageLayout>
  );
};

export default PngToWebp;

import ToolPageLayout from "@/components/tool/ToolPageLayout";
import ImageConverter from "@/components/tool/ImageConverter";


const PngToJpg = () => {
  return (
      <ToolPageLayout>
        <ImageConverter accept="image/png" output="jpg" title="Png to Jpg" />
      </ToolPageLayout>
  );
};

export default PngToJpg;

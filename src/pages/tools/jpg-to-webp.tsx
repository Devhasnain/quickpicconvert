import ToolPageLayout from "@/components/tool/ToolPageLayout";
import ImageConverter from "@/components/tool/ImageConverter";


const JpgToWebp = () => {
  return (
      <ToolPageLayout>
        <ImageConverter accept="image/jpeg" output="webp" title="Jpg to Webp" />
      </ToolPageLayout>
  );
};

export default JpgToWebp;

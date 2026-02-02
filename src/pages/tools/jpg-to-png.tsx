import ToolPageLayout from "@/components/tool/ToolPageLayout";
import ImageConverter from "@/components/tool/ImageConverter";


const JpgToPng = () => {
  return (
      <ToolPageLayout>
        <ImageConverter accept="image/jpeg" output="png" title="Jpg to png" />
      </ToolPageLayout>
  );
};

export default JpgToPng;

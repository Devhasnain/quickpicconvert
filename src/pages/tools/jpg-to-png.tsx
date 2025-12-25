import ToolPageLayout from "@/components/tool/ToolPageLayout";
import ImageConverter from "@/components/tool/ImageConverter";
import { Layout } from "@/components/layout/Layout";


const JpgToPng = () => {

  return (
      <ToolPageLayout>
       <ImageConverter
       accept="jpeg"
       output="png"
       title="Jpg to png"
       />
      </ToolPageLayout>
  );
};

export default JpgToPng;

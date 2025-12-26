import ToolPageLayout from "@/components/tool/ToolPageLayout";
import ImageConverter from "@/components/tool/ImageConverter";
import { PageSEO } from "@/components/PageSEO";


const JpgToPng = () => {
  return (
    <>
      <PageSEO
        title="JPG to PNG Converter – Convert JPG Images to PNG Online Free"
        description="Convert JPG images to PNG format online for free. Fast, secure, and browser-based JPG to PNG converter with no uploads required."
        canonical="https://quickpicconvert.com/tools/jpg-to-png"
        keywords="jpg to png, convert jpg to png, jpg png converter, image format converter, online jpg to png"
      />

      <ToolPageLayout>
        <ImageConverter accept="image/jpeg" output="png" title="Jpg to png" />
      </ToolPageLayout>
    </>
  );
};

export default JpgToPng;

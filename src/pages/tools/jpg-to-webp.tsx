import ToolPageLayout from "@/components/tool/ToolPageLayout";
import ImageConverter from "@/components/tool/ImageConverter";
import { PageSEO } from "@/components/PageSEO";


const JpgToWebp = () => {
  return (
    <>
      <PageSEO
        title="JPG to WEBP Converter – Convert JPG Images to WEBP Online"
        description="Convert JPG images to WEBP format online for better performance and smaller sizes. Fast, secure, and privacy-friendly JPG to WEBP tool."
        canonical="https://quickpicconvert.com/tools/jpg-to-webp"
        keywords="jpg to webp, convert jpg to webp, webp image converter, jpg webp, image compression"
      />

      <ToolPageLayout>
        <ImageConverter accept="image/jpeg" output="webp" title="Jpg to Webp" />
      </ToolPageLayout>
    </>
  );
};

export default JpgToWebp;

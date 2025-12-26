import ToolPageLayout from "@/components/tool/ToolPageLayout";
import ImageConverter from "@/components/tool/ImageConverter";
import { PageSEO } from "@/components/PageSEO";


const PngToWebp = () => {
  return (
    <>
      <PageSEO
        title="PNG to WEBP Converter – Convert PNG Images to WEBP Online"
        description="Convert PNG images to WEBP format for smaller file sizes and faster loading. Free PNG to WEBP converter running directly in your browser."
        canonical="https://quickpicconvert.com/tools/png-to-webp"
        keywords="png to webp, convert png to webp, webp converter, image optimization, png webp"
      />

      <ToolPageLayout>
        <ImageConverter accept="image/png" output="webp" title="Png to Webp" />
      </ToolPageLayout>
    </>
  );
};

export default PngToWebp;

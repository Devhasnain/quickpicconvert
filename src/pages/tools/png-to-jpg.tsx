import ToolPageLayout from "@/components/tool/ToolPageLayout";
import ImageConverter from "@/components/tool/ImageConverter";
import { PageSEO } from "@/components/PageSEO";


const PngToJpg = () => {
  return (
    <>
      <PageSEO
        title="PNG to JPG Converter – Convert PNG Images to JPG Online"
        description="Convert PNG images to JPG format online easily. Reduce file size and optimize images using our fast and secure PNG to JPG converter."
        canonical="https://quickpicconvert.com/tools/png-to-jpg"
        keywords="png to jpg, convert png to jpg, png jpg converter, image converter online, png to jpeg"
      />

      <ToolPageLayout>
        <ImageConverter accept="image/png" output="jpg" title="Png to Jpg" />
      </ToolPageLayout>
    </>
  );
};

export default PngToJpg;

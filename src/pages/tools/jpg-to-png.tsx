import ToolPageLayout from "@/components/tool/ToolPageLayout";
import ImageConverter from "@/components/tool/ImageConverter";
import { PageSEO } from "@/components/PageSEO";
import content from "@/data/content.json";


const JpgToPng = () => {
  return (
    <>
      <PageSEO
        title={content.jpgToPng.seo.title}
        description={content.jpgToPng.seo.description}
        canonical={content.jpgToPng.seo.canonical}
        keywords={content.jpgToPng.seo.keywords}
      />

      <ToolPageLayout>
        <ImageConverter accept="image/jpeg" output="png" title="Jpg to png" />
      </ToolPageLayout>
    </>
  );
};

export default JpgToPng;

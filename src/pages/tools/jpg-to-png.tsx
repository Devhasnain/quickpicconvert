import { getToolPageByPath } from "@/lib/getToolPageByPath";
import { PageMeta, ToolPageContent } from "@/components";
import { ToolPageProps } from "@/types";
import { JpgToPngTool } from "@/tools";
import { GetStaticProps } from "next";


const JpgToPng = ({
  toolPage,
  breadcrumb,
  jsonSchemas,
}: ToolPageProps) => {
  return (
    <>
      <PageMeta
        title={toolPage.postMeta.metaTitle}
        description={toolPage.postMeta.metaDescription}
        pathname={toolPage.slug}
        image={toolPage?.featuredImage?.node?.sourceUrl||""}
        ogType={"website"}
        date=""
        jsonSchema={jsonSchemas}
      />
      <JpgToPngTool />
      <ToolPageContent
        content={toolPage?.content || ""}
        breadcrumb={breadcrumb}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () =>
  await getToolPageByPath("jpg-to-png");

export default JpgToPng;

import { getToolPageByPath } from "@/lib/getToolPageByPath";
import { PageMeta, ToolPageContent } from "@/components";
import { ToolPageProps } from "@/types";
import { PngToJpgTool } from "@/tools";
import { GetStaticProps } from "next";


const PngToJpg = ({ toolPage, breadcrumb, jsonSchemas }: ToolPageProps) => {
  return (
    <>
      <PageMeta
        title={toolPage.postMeta.metaTitle}
        description={toolPage.postMeta.metaDescription}
        pathname={toolPage.slug}
        image={toolPage?.featuredImage?.node?.sourceUrl || ""}
        ogType={"website"}
        date=""
        jsonSchema={jsonSchemas}
      />
      <PngToJpgTool />
      <ToolPageContent
        content={toolPage?.content || ""}
        breadcrumb={breadcrumb}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () =>
  await getToolPageByPath("png-to-jpg");

export default PngToJpg;

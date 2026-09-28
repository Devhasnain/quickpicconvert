import { getToolPageByPath } from "@/lib/getToolPageByPath";
import { PageMeta, ToolPageContent } from "@/components";
import { ImageToJpgTool } from "@/tools";
import { ToolPageProps } from "@/types";
import { GetStaticProps } from "next";


const ImageToJpg = ({
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
      <ImageToJpgTool />
      <ToolPageContent
        content={toolPage?.content || ""}
        breadcrumb={breadcrumb}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () =>
  await getToolPageByPath("image-to-jpg");

export default ImageToJpg;

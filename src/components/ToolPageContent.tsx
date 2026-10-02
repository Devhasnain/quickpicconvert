import { BreadCrumb } from "@/types";
import clsx from "clsx";

import { Breadcrumb } from "./Breadcrumb";
import { Container } from "./Container";


export const ToolPageContent = ({
  content,
  breadcrumb,
}: {
  content: string;
  breadcrumb: BreadCrumb[];
}) => {
  return (
    <Container className="py-10" element="div">
      <Breadcrumb items={breadcrumb} defineSchema={false} />

      <div
        className={clsx(
          "prose",
          "text-gray-500",
          "font-light",
          "leading-relaxed",
          "space-y-6",
          "prose-headings:text-black",
          "prose-headings:font-bold",
          "prose-headings:tracking-tight",
          "prose-h2:text-2xl",
          "prose-h2:pt-4",
          "prose-h3:text-xl",
          "prose-p:text-sm",
          "sm:prose-p:text-base",
          "prose-p:leading-relaxed",
          "prose-strong:text-black",
          "prose-strong:font-semibold",
          "prose-a:text-primary",
          "prose-code:text-gray-500",
          "prose-code:font-medium",
          "max-w-full"
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />

    </Container>
  );
};

import { getToolSchemaString } from "@/lib/generateToolSchema";
import { Tool } from "@/data/tool";
import { ReactNode } from "react";
import Head from "next/head";


interface PageSEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  children?: ReactNode;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?:string;
  ogURL?:string;
  tool?:Tool
}

const BRAND = "Quick Pic Convert";
const MAX_TITLE_LENGTH = 60;
const MAX_DESC_LENGTH = 160;

const buildTitle = (title: string) => {
  const brandedTitle = `${title} | ${BRAND}`;

  return brandedTitle.length <= MAX_TITLE_LENGTH ? brandedTitle : title;
};

const buildDescription = (description: string) => {
  if (!description) return "";

  return description.length <= MAX_DESC_LENGTH
    ? description
    : description.slice(0, MAX_DESC_LENGTH - 3).trim() + "...";
};

export function PageSEO({
  title,
  description,
  canonical,
  keywords,
  children,
  ogTitle,
  ogDescription,
  ogImage,
  ogURL,
  tool
}: PageSEOProps) {
  const metaTitle = buildTitle(title);
  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={buildDescription(description)} />
      {keywords && <meta name="keywords" content={keywords} ></meta>}
      {canonical && <link rel="canonical" href={canonical} ></link>}
      <meta name="apple-mobile-web-app-title" content="Quick pic convert" ></meta>

      <meta property="og:title" content={ogTitle || metaTitle} ></meta>
      <meta property="og:description" content={ogDescription || description} ></meta>
      <meta
        property="og:image"
        content={ogImage || "https://quickpicconvert.com/Quick-pic-convert-og-image.png"}
      ></meta>
      <meta property="og:url" content={ogURL || "https://quickpicconvert.com/"} ></meta>
      <meta property="og:type" content="website" ></meta>
      <meta property="og:site_name" content="Quick Pic Convert" ></meta>

      <meta name="twitter:title" content={metaTitle} ></meta>
      <meta name="twitter:description" content={description} ></meta>

      <link rel="favicon" href="/favicon.ico" type="image/x-icon" ></link>
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" ></link>
      <link rel="manifest" href="/manifest.json" ></link>
      <link rel="robots-file" href="/robots.txt"></link>
      {tool && 
     <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: getToolSchemaString(tool),
          }}
        />  
    }
      {children}
    </Head>
  );
}

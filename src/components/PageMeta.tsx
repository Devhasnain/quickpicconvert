import { PageMetaProps } from "@/types";
import Script from "next/script";
import Head from "next/head";


const domain = "https://quickpicconvert.com/";

export const PageMeta = ({
  title,
  description,
  image,
  date,
  ogType = "website",
  pathname,
  jsonSchema,
}: PageMetaProps) => {
  const canonical = `${domain}${pathname}`;
  return (
    <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {date && <meta property="article:published_time" content={date} />}
      <meta property="article:author" content="Hasnain Alam" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="icon" href="/favicon.ico" />

    </Head>
      {jsonSchema && (
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonSchema),
          }}
        />
      )}
    </>

  );
};

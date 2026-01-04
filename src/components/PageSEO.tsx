import { ReactNode } from "react";
import Head from "next/head";


interface PageSEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  children?: ReactNode;
}

export function PageSEO({
  title,
  description,
  canonical,
  keywords,
  children,
}: PageSEOProps) {
  const fullTitle = `${title} | Quick pic convert`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="apple-mobile-web-app-title" content="Quick pic convert" />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://quickpicconvert.com/Quick-pic-convert-og-image"
      />
      <meta property="og:url" content="https://quickpicconvert.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="QuickPicConvert" />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {children}
    </Head>
  );
}

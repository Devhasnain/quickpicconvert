import { ReactNode } from "react";
import Head from "next/head";


interface PageSEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  children?:ReactNode
}

export function PageSEO({ title, description, canonical, keywords,children}: PageSEOProps) {
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
      
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {children}
    </Head>
  );
}

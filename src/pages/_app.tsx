import "@/styles/globals.css";

import { GoogleTagManager } from "@next/third-parties/google";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Layout } from "@/components/layout/Layout";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import Head from "next/head";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Quick Pic Convert",
              url: "https://quickpicconvert.com",
              description:
                "Convert images and files to various formats like PNG, JPG, and PDF. Free online file conversion with Quick Pic Convert.",
              publisher: {
                "@type": "Organization",
                name: "Quick Pic Convert",
                logo: {
                  "@type": "ImageObject",
                  url: "https://quickpicconvert.com/logo-lg.png",
                },
              },
            }),
          }}
        />
      </Head>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ""} />
      <Toaster />
      <Sonner />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

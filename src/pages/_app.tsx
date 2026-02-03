import "@/styles/globals.css";

import { GoogleTagManager } from "@next/third-parties/google";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Layout } from "@/components/layout/Layout";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ""} />
      <Toaster />
      <Sonner />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

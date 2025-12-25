import "@/styles/globals.css";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Layout } from "@/components/layout/Layout";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Sonner />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

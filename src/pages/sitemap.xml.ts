import type { NextApiRequest, NextApiResponse } from "next";
import { tools } from "@/data/tool";


const BASE_URL = "https://quickpicconverter.com";

function generateSiteMap() {
  const staticPages = [
    "",
    "/tools",
    "/about",
  ];

  const toolPages = tools.map(
    (tool) => `
    <url>
      <loc>${BASE_URL}/tools/${tool.id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map(
        (page) => `
      <url>
        <loc>${BASE_URL}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${page === "" ? "1.0" : "0.9"}</priority>
      </url>
    `
      )
      .join("")}
    ${toolPages.join("")}
  </urlset>`;
}

export default function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

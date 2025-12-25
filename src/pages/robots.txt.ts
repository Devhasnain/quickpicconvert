import type { NextApiResponse } from "next";


export default function Robots() {
  return null;
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: https://quickpicconverter.com/sitemap.xml
`;

  res.setHeader("Content-Type", "text/plain");
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
}

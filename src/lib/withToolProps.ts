import { tools } from "@/data/tool";


export const withToolProps = async (slug: string) => {
  const tool = tools.find((tool) => tool.id === slug);
  return { props: { tool: JSON.stringify(tool) } }
};
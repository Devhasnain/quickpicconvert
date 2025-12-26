import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { LucideIcon, Zap } from "lucide-react";
import { ReactNode, useMemo } from "react";
import { Tool, tools } from "@/data/tool";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

import { ToolInstructions } from "./ToolInstructions";
import { PageSEO } from "../PageSEO";


type Props = {
  children: ReactNode;
  containerClassName?: string;
  contentContainerClassName?: string;
};
const ToolPageLayout = ({
  children,
  containerClassName,
  contentContainerClassName,
}: Props) => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  const pathname = useRouter().pathname;

  const tool: Tool | null = useMemo(() => {
    const tool = tools.find((t) => pathname === `/tools/${t.id}`);
    return tool || null;
  }, [pathname]);

  return (
    <>
      {tool && (
        <>
          <PageSEO
            title={tool ? tool.title : "Tool"}
            description={tool ? tool.description : "Tool description"}
            keywords={tool ? tool?.keywords?.join(", ") : "tool, generator"}
          />
          {/* <section className="pt-32 pb-16 min-h-screen">
            <div
              className={`${
                containerClassName ? containerClassName : "container-custom"
              }`}
            >
              <div>
                <Button asChild variant="ghost" className="-ml-2">
                  <Link href="/tools">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Tools
                  </Link>
                </Button>
              </div>
            </div>

            <div
              className={`${
                contentContainerClassName
                  ? contentContainerClassName
                  : "container-custom max-w-2xl"
              }`}
            >
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center">
                  {tool.title}
                </h1>
                <p className="text-muted-foreground text-center mb-8">
                  {tool.description}
                </p>

                {children}
              </div>
              {tool?.instructions && (
                <ToolInstructions
                  title={tool.instructions.title}
                  description={tool.instructions.description}
                  steps={tool.instructions.steps}
                  tips={tool.instructions.tips}
                  faqs={tool.instructions.faqs}
                  Icon={tool.icon as LucideIcon}
                />
              )}
            </div>
          </section> */}

          <section className="pt-32 pb-8 bg-hero-bg">
            <div className="container-custom">
              <div
                ref={headerRef}
                className={cn(
                  "text-center max-w-3xl mx-auto",
                  headerVisible ? "animate-fade-up" : "opacity-0"
                )}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-accent-foreground">
                    All Tools Available Free
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
                  {tool.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </div>
          </section>

          <section className="container-custom mt-8">
            <div className="max-w-3xl mx-auto">{children}</div>
          </section>

          {tool?.instructions && (
            <ToolInstructions
              title={tool.instructions.title}
              description={tool.instructions.description}
              steps={tool.instructions.steps}
              tips={tool.instructions.tips}
              faqs={tool.instructions.faqs}
              Icon={tool.icon as LucideIcon}
            />
          )}
        </>
      )}
    </>
  );
};

export default ToolPageLayout;

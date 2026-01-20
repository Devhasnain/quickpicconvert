import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { memo, ReactNode, useMemo } from "react";
import { LucideIcon, Zap } from "lucide-react";
import { Tool, tools } from "@/data/tool";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

import { ToolInstructions } from "./ToolInstructions";
import { PageSEO } from "../PageSEO";


type Props = {
  children: ReactNode;
  containerClassName?: string;
  mainContainerClassName?: string;
  pageHero?: "default" | "custom";
};
const ToolPageLayout = ({
  children,
  containerClassName,
  mainContainerClassName,
  pageHero = "default",
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
          {pageHero === "default" ? (
            <section className="pt-24 pb-7 bg-hero-bg">
              <div className="container-custom">
                <div
                  ref={headerRef}
                  className={cn(
                    "text-center max-w-5xl mx-auto",
                    headerVisible ? "animate-fade-up" : "opacity-0"
                  )}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-4">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-accent-foreground">
                      All Tools Available Free
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
                    {tool.title}
                  </h1>
                  <p className="text-lg max-w-3xl m-auto text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}

          <section className={`container-custom pb-8 ${mainContainerClassName}`}>
            <div className={`max-w-3xl mx-auto ${containerClassName}`}>
              {children}
            </div>
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

export default memo(ToolPageLayout);

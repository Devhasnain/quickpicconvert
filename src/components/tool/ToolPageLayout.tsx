import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { memo, ReactNode } from "react";
import { Zap } from "lucide-react";
import { Tool } from "@/data/tool";
import { cn } from "@/lib/utils";

import { ToolInstructions } from "./ToolInstructions";
import UploadImageBtn from "./UploadImageBtn";
import LogoShaped from "../LogoShaped";
import { PageSEO } from "../PageSEO";


type Props = {
  tool: Tool;
  children: ReactNode;
  toolBar?: ReactNode;
  hideTextContent?: boolean;
  openExplorer?: () => void;
};
const ToolPageLayout = ({
  tool,
  children,
  toolBar,
  openExplorer,
  hideTextContent = false,
}: Props) => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <>
      {/* {tool && ( */}
        <>
          <PageSEO
            title={tool?.seo.title || ""}
            description={tool?.seo?.description || ""}
            keywords={tool?.seo?.keywords}
            canonical={tool?.seo?.canonical}
          />
          <section
            className={
              "relative overflow-hidden min-h-screen gradient-bg pb-4 sm:pb-0"
            }
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            <div
              style={{
                opacity: hideTextContent ? "0%" : "100%",
              }}
              className="grid grid-cols-12 h-[100vh] px-5"
            >
              <div className="sm:col-span-2 col-span-12  pt-4">
                <LogoShaped />
              </div>
              <div className="col-span-8 h-full flex flex-col justify-center">
                <div
                  ref={headerRef}
                  className={cn(
                    "text-center max-w-5xl mx-auto",
                    headerVisible ? "animate-fade-up" : "opacity-0"
                  )}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-accent-foreground">
                      All Tools Available Free
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
                    {tool.title}
                  </h1>
                  <p className="text-lg max-w-3xl m-auto text-white/90 lg:mb-4 xl:mb-8">
                    {tool.description}
                  </p>
                  <UploadImageBtn
                    onClick={openExplorer ? openExplorer : () => {}}
                  />
                </div>
              </div>
              <div className="col-span-2"></div>
            </div>

            {hideTextContent && (
              <div className="grid grid-cols-12 h-screen absolute top-0 left-0 w-full z-10">
                <div className="col-span-3 h-full p-3">
                  <LogoShaped />

                  <div className="mt-4">{toolBar}</div>
                </div>

                <div className="col-span-9 h-full">{children}</div>
              </div>
            )}
          </section>

          <ToolInstructions
            title={tool.instructions.title}
            description={tool.instructions.description}
            steps={tool.instructions.steps}
            tips={tool.instructions.tips}
            faqs={tool.instructions.faqs}
          />
        </>
      {/* )} */}
    </>
  );
};

export default memo(ToolPageLayout);

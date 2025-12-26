import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { PageSEO } from "@/components/PageSEO";
import { Sparkles } from "lucide-react";
import { tools } from "@/data/tool";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";


const categories = [
  "Converter",
  "Optimizer",
  "Editor",
  "AI Tool",
  "Utility",
];

export default function ToolsPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools = tools.filter((tool) => {
    return activeCategory === "All" || tool.category === activeCategory;
  });

  return (
    <>
      <PageSEO
        title="All Tools"
        description="Browse our complete collection of free online tools including png to jpg converter, jpg to png converter, png to webp converter, jpg to webp converter and etc."
        keywords="online tools, image converter, file converter, png to jpg, jpg to png, png to webp"
      />
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-hero-bg">
        <div className="container-custom">
          <div
            ref={headerRef}
            className={cn(
              "text-center max-w-3xl mx-auto",
              headerVisible ? "animate-fade-up" : "opacity-0"
            )}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">
                All Tools Available Free
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
              Powerful Image <span className="gradient-text">Tools</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to convert, compress, resize, and edit your
              images. All tools work directly in your browser for maximum
              privacy and speed.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="pt-8 pb-16 bg-background">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
             <button
              onClick={(e)=>setActiveCategory("All")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                All
              </button>
            {categories.map((category) => (
              <button
              onClick={(e)=>setActiveCategory(category)}
                key={category}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools?.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

interface ToolCardProps {
  tool: (typeof tools)[0];
  index: number;
}

function ToolCard({ tool, index }: ToolCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLAnchorElement>({
    threshold: 0.1,
  });
  const delay = (index % 4) * 100;

  return (
    <Link
      href={`/tools/${tool.id}`}
      ref={ref}
      className={cn("group block", isVisible ? "animate-fade-up" : "opacity-0")}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="tool-card h-full">
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground mb-4">
          {tool.category}
        </span>

        {/* Icon */}
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br transition-all duration-300 group-hover:shadow-lg group-hover:scale-105",
            tool.color
          )}
        >
          <tool.icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {tool.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tool.description}
        </p>

        {/* Hover Arrow */}
        <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Use Tool →
        </div>
      </div>
    </Link>
  );
}

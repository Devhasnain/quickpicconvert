import { toolCards, toolCategories } from "@/data";
import { useMemo, useState } from "react";
import Link from "next/link";

import { Container } from "../Container";


export function HeroSection() {
  const [activeCat, setActiveCat] = useState("All");
  const filteredTools = useMemo(() => {
    if (activeCat === "All") return toolCards;
    return toolCards.filter((item) => item.category === activeCat);
  }, [activeCat]);
  return (
    <section className="bg-gray-100">
      <Container element="div" className={"space-y-8 py-10"}>
        <h1
          className={
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center"
          }
        >
          Free Online Image Converter JPG, PNG, WebP & More
        </h1>

        <p
          className={
            "text-lg sm:text-xl text-muted-foreground w-full sm:w-8/12 mx-auto text-center"
          }
        >
          Quick Pic Converter lets you convert images online in seconds. Convert
          JPG to PNG, PNG to JPG, WebP, compress images, resize, crop, and
          enhance all for free with complete privacy.
        </p>

        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, ipsa.
        </p>

        <ul className="flex flex-row flex-wrap items-center justify-center gap-2">
          {toolCategories.map((c, i) => (
            <li key={i}>
              <button
                className={`cursor-pointer py-1.5 px-5 border rounded-full text-center ${
                  activeCat === c
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-gray-200"
                } `}
                onClick={() => setActiveCat(c)}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredTools.map((t, i) => (
            <Link key={i} href={t.slug} title={t.title}>
              <div className="p-5 bg-white rounded-lg space-y-3 hover:shadow-lg border border-gray-200">
                <div className="h-12 w-12 rounded-lg flex flex-col items-center justify-center bg-primary text-white">
                  {t.icon}
                </div>
                <h3 className="text-lg font-medium">{t.title}</h3>
                <p className="text-sm">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Accusamus sint aliquam sapiente, illo nostrum repellat.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

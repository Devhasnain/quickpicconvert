import { hotItWorksSteps } from "@/data/homePageJsonSchema";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { Container } from "../Container";


export function HowItWorksSection() {
  return (
    <section className="py-20" id="howto">
      <Container element="div">
        {/* Header */}
        <div className={"text-center mx-auto mb-16"}>
          <span className="inline-block text-sm font-semibold uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-bold text-foreground mb-4">
            How to <b className="text-primary">Convert Images Online</b> in 3 Easy Steps
          </h2>
          <p className="text-lg text-muted-foreground">
            Converting an image takes less than a minute. Add your files, choose
            a format like JPG, PNG, or WebP, and download the result. It works
            on any phone, tablet, or computer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hotItWorksSteps.map((step, i) => (
            <StepCard
              id={i}
              key={step.step}
              step={step}
              isLast={i === hotItWorksSteps.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface StepCardProps {
  step: (typeof hotItWorksSteps)[0];
  isLast: boolean;
  id: number;
}

function StepCard({ step, isLast, id }: StepCardProps) {
  return (
    <div className="relative" id={`step-${id}`}>
      <div className={cn("relative text-center")}>
        {/* Step Number */}
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl font-extrabold text-gray-800/10 select-none">
          {step.step}
        </span>

        {/* Icon */}
        <div className="relative z-10 w-20 h-20 mx-auto rounded-3xl bg-primary/70 flex items-center justify-center mb-6 shadow-glow">
          <step.icon className="w-10 h-10 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {step.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Arrow Connector */}
      {!isLast && (
        <div className="hidden md:block absolute top-20 right-0 translate-x-1/2 -translate-y-1/2">
          <ArrowRight className="w-8 h-8 text-primary/30" />
        </div>
      )}
    </div>
  );
}

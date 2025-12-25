import { LucideIcon } from "lucide-react";


type Props = {
  title?: string;
  description?: string;
  steps: { title: string; description: string }[];
  tips: string[];
  faqs: { question: string; answer: string }[];
  Icon?: LucideIcon;
};

export function ToolInstructions({
  title,
  description,
  steps,
  tips,
  faqs,
  Icon,
}: Props) {
  return (
    <div className="mt-8 space-y-8 max-w-3xl mx-auto pb-20" >
      {/* About Section */}
      <section className="bg-card rounded-2xl border border-border p-6 md:p-8">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-display font-semibold mb-3">
              About {title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* How to Use */}
      {steps && steps.length > 0 && (
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8">
          <h2 className="text-xl font-display font-semibold mb-6">
            How to Use
          </h2>
          <div className="space-y-4">
            {steps?.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tips */}
      {tips && tips.length > 0 && (
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8">
          <h2 className="text-xl font-display font-semibold mb-4">Pro Tips</h2>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <span className="text-primary font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8">
          <h2 className="text-xl font-display font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

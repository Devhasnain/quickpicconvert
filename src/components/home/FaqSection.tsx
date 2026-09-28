import { stripHtml } from "@/lib/utils";

import { Container } from "../Container";
import { Accordion } from "../Accordion";


type Props = {
  faqs: any[] | [];
};

export const FaqSection = ({ faqs }: Props) => {
  return (
    <Container element="section" className="py-20">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          FAQ's
        </h2>
        <p className="text-lg text-muted-foreground">
          Everything you need to convert, compress, and optimize your images
          efficiently.
        </p>
      </div>
      <div className="w-8/12 mx-auto mt-16 space-y-3">
        {faqs?.map((item) => (
          <Accordion
            title={item?.title || ""}
            description={stripHtml(item?.excerpt)}
          />
        ))}
      </div>
    </Container>
  );
};

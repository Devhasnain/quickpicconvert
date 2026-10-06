import { stripHtml } from "@/lib/utils";

import { Container } from "../Container";
import { Accordion } from "../Accordion";


type Props = {
  faqs: any[] | [];
};

export const FaqSection = ({ faqs }: Props) => {
  return (
    <Container id="faq" element="section" className="py-20">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-bold text-foreground mb-4">
          Frequently <span className="text-primary">Asked Questions</span> About Our Image Converter
        </h2>
        <p className="text-lg text-muted-foreground">
          Find quick answers about converting JPG, PNG, and WebP images, file
          privacy, and how our tool works. Still have a question? Contact us and
          we will help.
        </p>
      </div>
      <div className="w-full md:w-8/12 mx-auto mt-16 space-y-3">
        {faqs?.map((item, i) => (
          <Accordion
            key={i}
            title={item?.title || ""}
            description={stripHtml(item?.excerpt)}
          />
        ))}
      </div>
    </Container>
  );
};

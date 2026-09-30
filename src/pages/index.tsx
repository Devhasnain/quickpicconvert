import { FaqSection, CTASection, HeroSection, FeaturesSection, HowItWorksSection, TestimonialsSection, BlogsSection, PageMeta, } from "@/components";
import { homePageJsonSchema } from "@/data/homePageJsonSchema";
import { getBlogs, getFaqs } from "@/lib/api";


type Props = {
  posts: any[] | [];
  faqs: any[] | [];
};

const Index = ({ posts, faqs }: Props) => {
  const jsonSchema = homePageJsonSchema({
    faqs: faqs.map((r) => ({ q: r.title, a: r.excerpt })),
  });
  return (
    <>
      <PageMeta
        title="Free Online Image Converter"
        description="Free online image converter description"
        ogType={"website"}
        pathname=""
        jsonSchema={jsonSchema}
        image={`${process.env.NEXT_PUBLIC_SITE_URL}/Quick-pic-convert-og-image.webp`}
      />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <BlogsSection posts={posts} />
      <TestimonialsSection />
      <CTASection />
      <FaqSection faqs={faqs} />
    </>
  );
};
export const getStaticProps = async () => {
  const blogRes = await getBlogs(3);
  const posts = blogRes.data?.data?.posts?.nodes || [];

  const faqRes = await getFaqs();
  const faqs = faqRes.data?.data?.faqs?.nodes || [];
  return { props: { posts, faqs } };
};

export default Index;

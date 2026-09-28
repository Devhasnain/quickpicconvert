import { FaqSection, CTASection, HeroSection, FeaturesSection, HowItWorksSection, TestimonialsSection, BlogsSection, PageMeta, } from "@/components";
import { getBlogs, getFaqs } from "@/lib/api";


type Props = {
  posts: any[] | [];
  faqs: any[] | [];
};

const Index = ({ posts, faqs }: Props) => {
  return (
    <>
    <PageMeta
    title="Free online image converter"
    description="Free online image converter description"
    ogType={"website"}
    pathname=""
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

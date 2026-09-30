import { Breadcrumb, Container } from "@/components";
import { getLegalPageBySlug } from "@/lib/api";
import moment from "moment";
import clsx from "clsx";


type Props = {
  page: {
    title: string;
    content: string;
    date: string;
  };
};

export default function TermsPage({ page }: Props) {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 py-10">
        <Container
          element="div"
          className="text-center flex flex-col items-center"
        >
          <Breadcrumb
            items={[
              {
                name: "Home",
                href: "/",
              },
              {
                name: "Terms of Services",
                href: "/terms",
              },
            ]}
          />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            {page?.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {moment.utc(page?.date).format("MMMM D, YYYY")}
          </p>
        </Container>
      </section>

        <Container className="py-16 lg:py-20" element="section">
        <div
          className={clsx(
            "prose",
            "text-gray-600",
            "font-light",
            "leading-relaxed",
            "space-y-6",
            "prose-headings:text-black",
            "prose-headings:font-bold",
            "prose-headings:tracking-tight",
            "prose-h2:text-2xl",
            "prose-h2:pt-4",
            "prose-h3:text-xl",
            "prose-p:text-sm",
            "sm:prose-p:text-base",
            "prose-p:leading-relaxed",
            "prose-strong:text-black",
            "prose-strong:font-semibold",
            "prose-a:text-primary",
            "prose-code:text-gray-500",
            "prose-code:font-medium",
          "max-w-full"
          )}
          dangerouslySetInnerHTML={{ __html: page?.content }}
        />
        </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const blogRes = await getLegalPageBySlug("terms");
  const page = blogRes.data?.data?.legalPage;
  return { props: { page } };
};

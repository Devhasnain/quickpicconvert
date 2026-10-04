import { Breadcrumb, Button, Container, PageMeta } from "@/components";
import { getBlogBySlug, getBlogSlugs } from "@/lib/api";
import { stripHtml } from "@/lib/utils";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import clsx from "clsx";


const domain = "https://quickpicconvert.com";
export default function BlogPost({ post }: { post: any }) {
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }
  const breadcrumbItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: post?.title || "Blog post",
      href: `/blog/${post?.slug || "/blog/*"}`,
    },
  ];
  const cleanExcerpt = stripHtml(post?.excerpt);
  const metaTitle = post?.postMeta?.metaTitle || post.title;
  const metaDescription = post?.postMeta?.metaDescription || cleanExcerpt;
  const imageUrl =
    post?.featuredImage?.node?.sourceUrl || `${domain}/logo-lg.png`;

  return (
    <>
      <PageMeta
        title={metaTitle}
        description={metaDescription}
        image={imageUrl}
        ogType={"article"}
        pathname={`/blog/${post?.slug}`}
      />
      <Container element="section" className="pt-14 pb-20">
        <article className="space-y-8">
          <header className="space-y-4">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <span className="text-gray-600 font-mono">●</span>
              <time className="text-gray-400" dateTime={post?.date}>
                {moment.utc(post?.date).format("MMMM D, YYYY")}
              </time>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {post?.title}
            </h1>

            <p className="text-gray-500 text-base sm:text-lg font-light leading-relaxed italic border-l-2 border-primary pl-4">
              {cleanExcerpt}
            </p>
          </header>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-200">
            <Image
              src={imageUrl}
              alt={
                post?.featuredImage?.node?.altText || "Hasnain Alam post image"
              }
              title={
                post?.featuredImage?.node?.title ||
                "Hasnain Alam post image title"
              }
              aria-description={
                post?.featuredImage?.node?.description ||
                "Hasnain Alam post image description"
              }
              className="w-full h-full object-cover object-center"
              priority
              fill
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <div
            className={clsx(
              "prose",
              "text-gray-500",
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
              "prose-code:font-medium"
            )}
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />

          <footer className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-cyan-400 p-px">
                <div className="w-full h-full bg-[#080b13] rounded-full flex items-center justify-center text-xl font-bold">
                  🎯
                </div>
              </div>
              <Link href={"/team/hasnain-alam"}>
                <h4 className="text-sm font-bold">Written by Hasnain Alam</h4>
                <p className="text-xs text-gray-400">
                  Full-Stack Mern & Next.js Developer
                </p>
              </Link>
            </div>
          </footer>
        </article>
      </Container>
    </>
  );
}

export const getStaticPaths = async () => {
  const posts = await getBlogSlugs();
  const paths = posts.map((post: { slug: string }) => ({
      params: post,
    })) || [];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const post = await getBlogBySlug(slug);
    if (!post) {
      return { notFound: true };
    }

    return {
      props: { post },
      revalidate: 300,
    };
  } catch (error: any) {
    console.log(error?.message);
    return {
      props: {
        post: null,
      },
      notFound: true,
    };
  }
};

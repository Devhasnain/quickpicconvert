import { BlogCard, Breadcrumb, Container, PageMeta } from "@/components";
import { getReadTime } from "@/lib/utils";
import { getBlogs } from "@/lib/api";


export default function BlogPage({ posts }: { posts: any[] | [] }) {
  return (
    <>
      <PageMeta
        title="Image Optimization Tips & Guides | Quick Pic Convert"
        description="Learn how to convert, compress, and resize images the right way. Our
            simple guides cover JPG, PNG, and WebP, and show you how to make
            your website load faster and your photos look great."
        pathname="about"
        ogType={"website"}
        image={`${process.env.NEXT_PUBLIC_SITE_URL}/Quick-pic-convert-og-image.webp`}
      />

      <section className={`bg-gray-100`}>
        <Container
          element="div"
          className={"text-center py-10 flex flex-col items-center"}
        >
          <Breadcrumb
            items={[
              {
                name: "Home",
                href: "/",
              },
              {
                name: "Blog",
                href: "/blog",
              },
            ]}
          />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn how to convert, compress, and resize images the right way. Our
            simple guides cover JPG, PNG, and WebP, and show you how to make
            your website load faster and your photos look great. Read our latest
            posts and get more from every image.
          </p>
        </Container>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <Container element="section" className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard
                key={post?.slug}
                post={{
                  ...post,
                  readTime: getReadTime(post.excerpt),
                  image: post.featuredImage?.node?.sourceUrl || "",
                }}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const blogRes = await getBlogs(10);
  const posts = blogRes.data?.data?.posts?.nodes || [];
  return { props: { posts } };
};

import { DocumentRenderer, defaultRenderers, } from "@keystone-6/document-renderer";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import { Calendar } from "lucide-react";
import Posts from "@/data/Posts.json";
import Link from "next/link";


export default function BlogPost({ post }: { post: any }) {
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageSEO
        title={post.title || post.seoTitle}
        description={post.seoDescription || post.excerpt}
        keywords={post.tags?.map((tag: any) => tag.name).join(", ") || ""}
        ogTitle={post.ogTitle || post.seoTitle || post.title}
        ogDescription={
          post.ogDescription || post.seoDescription || post.excerpt
        }
        canonical={`https://quickpicconvert.com/blog/${post.slug}`}
      />

      <article className="pt-28 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              {/* <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
                {post.category}
              </span> */}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {/* <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span> */}
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-video rounded-2xl overflow-hidden mb-10">
              <img
                src={`https://quickpicconvert-cms.up.railway.app${post?.image?.url}`}
                alt={post.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none article">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <DocumentRenderer
                document={post?.content?.document || post?.content || []}
                renderers={defaultRenderers}
              />
            </div>

            {/* Author Card */}
            {/* <div className="mt-12 p-6 bg-card rounded-2xl border border-border">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Written by
                  </p>
                  <p className="font-display font-semibold text-lg">
                    {post.author}
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </article>
    </>
  );
}

export const getStaticPaths = async () => {
  // const graphql = JSON.stringify({
  //   query:
  //     'query {\r\n  posts(\r\n    where: {\r\n      status: { equals: "published" }\r\n    }\r\n  ) {\r\n    slug\r\n  }\r\n}\r\n',
  //   variables: {},
  // });

  // const requestOptions = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: graphql,
  // };

  try {
    // const response = await fetch(
    //   "https://quickpicconvert-cms.up.railway.app/api/graphql",
    //   requestOptions
    // );
    // const result = await response.text();

    let posts = Posts;
    // JSON.parse(result)?.data?.posts || [];
    const paths: string[] = [];
    posts.forEach((item: any) => {
      paths.push(`/blog/${item?.slug}`);
    });
    return {
      paths,
      fallback: true,
    };
  } catch (_error) {
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps = async (context: { params: { slug: string } }) => {
  //   const graphql = JSON.stringify({
  //   query: `query {\r\n  posts(\r\n    where: {\r\n      slug: { equals: \"${context.params.slug}\" }\r\n      status: { equals: \"published\" }\r\n    }\r\n  ) {\r\n    title\r\n    slug\r\n    excerpt\r\n    content {\r\n        document\r\n    }\r\n    image {\r\n      url\r\n    }\r\n    seoTitle\r\n    imageAlt\r\n    seoDescription\r\n    canonicalUrl\r\n    \r\n    ogTitle\r\n    ogDescription\r\n    publishedAt\r\n    noIndex\r\n    tags {\r\n        name\r\n    }\r\n  }\r\n}\r\n`,
  //   variables: {}
  // })
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: graphql,
  //   };

  try {
    // const response = await fetch(
    //   "https://quickpicconvert-cms.up.railway.app/api/graphql",
    //   requestOptions
    // );
    // const result = await response.text();
    // return { props: { post: JSON.parse(result)?.data?.posts[0] || null } };
    let post = Posts.find((item) => item.slug === context.params.slug);
    return { props: { post } };
  } catch (_error) {
    return { props: { post: null } };
  }
};

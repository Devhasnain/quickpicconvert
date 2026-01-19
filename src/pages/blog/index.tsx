import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { PageSEO } from "@/components/PageSEO";
import { Calendar } from "lucide-react";
import Posts from "@/data/Posts.json";
import { cn } from "@/lib/utils";
import Link from "next/link";


type Post = {
excerpt:string
image: {url:string}
imageAlt:string
publishedAt:string
slug:string
title:string
}

const categories = [
  "All",
  "Guide",
  "Tutorial",
  "SEO",
  "Performance",
  "Technology",
];

export default function BlogPage({posts}: {posts: any}) {

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <>
      <PageSEO
        title="Blog – Image Optimization Tips & Tools | Quick Pic Convert"
        description="Explore tutorials, guides, and tips on image conversion, compression, optimization, and modern web image best practices."
        canonical="https://quickpicconvert.com/blog"
        keywords="image optimization blog, image compression tips, web images guide, quick pic convert blog"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-hero-bg">
        <div className="container-custom">
          <div
            ref={headerRef}
            className={cn(
              "text-center max-w-3xl mx-auto",
              headerVisible ? "animate-fade-up" : "opacity-0"
            )}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Tips, tutorials, and insights about image optimization, web
              performance, and digital media.
            </p>

            {/* Search Bar */}
            {/* <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pt-8 pb-16 bg-background">
        <div className="container-custom">
          {/* Category Filter */}
          {/* <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  category === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div> */}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post, index:number) => (
              <BlogCard key={index} post={post} index={index} />
            ))}
          </div>

          {/* Load More */}
          {/* <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-accent transition-colors">
              Load More Articles
              <ArrowRight className="w-4 h-4" />
            </button>
          </div> */}
        </div>
      </section>
    </>
  );
}

interface BlogCardProps {
  post: Post;
  index: number;
}

function BlogCard({ post, index }: BlogCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLAnchorElement>({
    threshold: 0.1,
  });
  const delay = (index % 3) * 100;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      ref={ref}
      className={cn("group block", isVisible ? "animate-fade-up" : "opacity-0")}
      style={{ animationDelay: `${delay}ms` }}
    >
      <article className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={`https://quickpicconvert-cms.up.railway.app${post?.image?.url}`}
            alt={post.imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-medium text-accent-foreground mb-3">
            {post.category}
          </span> */}

          <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            {/* <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span> */}
          </div>
        </div>
      </article>
    </Link>
  );
}

export const getStaticProps = async () => {
  // const graphql = JSON.stringify({
  //   query:
  //     'query {\r\n  posts(where: { status: { equals: "published" } }) {\r\n    title\r\n    slug\r\n    excerpt\r\n    image {\r\n      url\r\n    }\r\n    imageAlt\r\n    publishedAt\r\n  }\r\n}\r\n',
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
    // return { props: { posts:JSON.parse(result)?.data?.posts } };
    return {props : {posts:Posts}}
  } catch (_error) {
    return { props: { posts:[] } };
  }
};

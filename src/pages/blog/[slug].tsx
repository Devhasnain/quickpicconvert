import { Calendar, Clock, User } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
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
      {/* <PageSEO
        title={post.title}
        description={post.excerpt}
        keywords={`${post.category}, blog, tutorial`}
      /> */}

      <article className="pt-28 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
                {post.category}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-video rounded-2xl overflow-hidden mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                {post.content}
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <h2 className="text-2xl font-display font-bold mt-10 mb-4">
                Key Takeaways
              </h2>

              <ul className="space-y-2 text-foreground">
                <li>Understanding the fundamentals is crucial for success</li>
                <li>
                  Practice makes perfect - consistent effort leads to
                  improvement
                </li>
                <li>Don't be afraid to experiment and try new approaches</li>
                <li>
                  Learn from mistakes and use them as opportunities to grow
                </li>
              </ul>

              <p className="text-foreground leading-relaxed mt-6">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>

            {/* Author Card */}
            <div className="mt-12 p-6 bg-card rounded-2xl border border-border">
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
            </div>
          </div>
        </div>
      </article>

    </>
  );
}

export const getStaticPaths = () => {
  const paths: string[] = [];
  blogPosts.forEach((item) => {
    paths.push(`/blog/${item?.id}`);
  });
  return {
    paths,
    fallback: true,
  };
};

const blogPosts = [
  {
    id: "webp-vs-jpeg-2024",
    title: "WebP vs JPEG: Which Format Should You Use in 2024?",
    excerpt:
      "A comprehensive comparison of WebP and JPEG formats, including performance benchmarks, browser support, and use cases.",
    category: "Guide",
    date: "2024-01-15",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
  {
    id: "image-compression-seo",
    title: "How Image Compression Improves Your Website SEO",
    excerpt:
      "Learn how optimized images can significantly boost your search engine rankings and improve user experience.",
    category: "SEO",
    date: "2024-01-10",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c5f4?w=600&h=400&fit=crop",
  },
  {
    id: "batch-image-processing",
    title: "The Ultimate Guide to Batch Image Processing",
    excerpt:
      "Save hours of work by learning how to process hundreds of images at once with our batch tools.",
    category: "Tutorial",
    date: "2024-01-05",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
  },
  {
    id: "png-transparency-guide",
    title: "Understanding PNG Transparency: A Complete Guide",
    excerpt:
      "Everything you need to know about PNG transparency, alpha channels, and when to use transparent images.",
    category: "Guide",
    date: "2023-12-28",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
  },
  {
    id: "mobile-image-optimization",
    title: "Mobile-First Image Optimization Strategies",
    excerpt:
      "Optimize your images for mobile devices to improve load times and reduce data usage for your users.",
    category: "Performance",
    date: "2023-12-20",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
  },
  {
    id: "avif-future-images",
    title: "AVIF: The Future of Image Compression",
    excerpt:
      "Explore the next-generation image format that offers superior compression and quality compared to WebP.",
    category: "Technology",
    date: "2023-12-15",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
  },
];

export const getStaticProps = (context: { params: { slug: string } }) => {
  const { slug } = context.params;
  const post = blogPosts.find((p) => p.id === slug);
  return { props: { post } };
};

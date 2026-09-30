import { cn, getReadTime } from "@/lib/utils";
import { Star, Quote } from "lucide-react";

import { Container } from "../Container";
import { BlogCard } from "../BlogCard";


type Props = {
  posts: any[] | [];
};
export function BlogsSection({ posts }: Props) {
  return (
    <Container element="section" className="w-10/12 mx-auto py-20">
      <div className={"text-center mb-16"}>
        <span className="inline-block text-sm font-semibold uppercase tracking-wider">
          Blogs
        </span>
        <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-bold text-foreground mb-4">
          Image <span className="text-primary">Tips and Guides</span> from Our Blog
        </h2>
        <p className="text-lg">
          Learn how to convert, compress, and resize images the right way. Our
          simple guides cover JPG, PNG, and WebP, and show you how to make your
          website load faster and your photos look great. Read our latest posts
          and get more from every image.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            post={{
              ...post,
              readTime: getReadTime(post.excerpt),
              image: post.featuredImage?.node?.sourceUrl || "",
            }}
          />
        ))}
      </div>
    </Container>
  );
}

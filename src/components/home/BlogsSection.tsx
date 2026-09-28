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
        <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider">
          Blogs
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Blogs
        </h2>
        <p className="text-lg">
          Join thousands of satisfied users who trust QuickPicConvert for their
          image needs.
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

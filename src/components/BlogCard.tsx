import { stripHtml } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";


type Props = {
  post: {
    imageDescription: string;
    alt: string;
    title: string;
    imageTitle: string;
    image: string;
    date: string;
    slug: string;
    excerpt: string;
    readTime: string;
  };
};

export const BlogCard = ({ post }: Props) => {
  return (
    <article className="group relative bg-card rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
      <div className="relative w-full h-52 bg-gray-200 overflow-hidden border-b border-gray-200 rounded-xl">

        <Image
          src={post.image || "/logo.png"}
          title={post?.imageTitle}
          alt={`${post?.alt}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          width={400}
          height={400}
          aria-description={post?.imageDescription}
        />
      </div>

      {/* 2. CORE TEXT CONTENT PIPELINE */}
      <div className="flex-1 flex flex-col justify-between space-y-4 mt-2">
        <div className="space-y-2">
          {/* SEO Optimized Semantic Date Element */}
          <div className="text-gray-500 text-sm tracking-wide">
            <time className="text-gray-500" dateTime={post?.date}>
              {moment.utc(post?.date).format("MMMM D, YYYY")}
            </time>
          </div>

          {/* Main Context Title Heading */}
          <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors duration-200 leading-snug line-clamp-2">
            <Link href={`/blog/${post.slug}`} className="focus:outline-none">
              {post.title}
            </Link>
          </h3>

          {/* Excerpt Summary Content */}
          <p className="text-foreground leading-relaxed line-clamp-3">
            {stripHtml(post.excerpt)}
          </p>
        </div>
      </div>
    </article>
  );
};

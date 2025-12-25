import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import Link from 'next/link';


const blogPosts = [
  {
    id: 'webp-vs-jpeg-2024',
    title: 'WebP vs JPEG: Which Format Should You Use in 2024?',
    excerpt: 'A comprehensive comparison of WebP and JPEG formats, including performance benchmarks, browser support, and use cases.',
    category: 'Guide',
    date: '2024-01-15',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  },
  {
    id: 'image-compression-seo',
    title: 'How Image Compression Improves Your Website SEO',
    excerpt: 'Learn how optimized images can significantly boost your search engine rankings and improve user experience.',
    category: 'SEO',
    date: '2024-01-10',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c5f4?w=600&h=400&fit=crop',
  },
  {
    id: 'batch-image-processing',
    title: 'The Ultimate Guide to Batch Image Processing',
    excerpt: 'Save hours of work by learning how to process hundreds of images at once with our batch tools.',
    category: 'Tutorial',
    date: '2024-01-05',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop',
  },
  {
    id: 'png-transparency-guide',
    title: 'Understanding PNG Transparency: A Complete Guide',
    excerpt: 'Everything you need to know about PNG transparency, alpha channels, and when to use transparent images.',
    category: 'Guide',
    date: '2023-12-28',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
  },
  {
    id: 'mobile-image-optimization',
    title: 'Mobile-First Image Optimization Strategies',
    excerpt: 'Optimize your images for mobile devices to improve load times and reduce data usage for your users.',
    category: 'Performance',
    date: '2023-12-20',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
  },
  {
    id: 'avif-future-images',
    title: 'AVIF: The Future of Image Compression',
    excerpt: 'Explore the next-generation image format that offers superior compression and quality compared to WebP.',
    category: 'Technology',
    date: '2023-12-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
  },
];

const categories = ['All', 'Guide', 'Tutorial', 'SEO', 'Performance', 'Technology'];

export default function BlogPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-hero-bg">
        <div className="container-custom">
          <div
            ref={headerRef}
            className={cn(
              'text-center max-w-3xl mx-auto',
              headerVisible ? 'animate-fade-up' : 'opacity-0'
            )}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Tips, tutorials, and insights about image optimization, 
              web performance, and digital media.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pt-8 pb-16 bg-background">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  category === 'All'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-accent transition-colors">
              Load More Articles
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

interface BlogCardProps {
  post: typeof blogPosts[0];
  index: number;
}

function BlogCard({ post, index }: BlogCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLAnchorElement>({ threshold: 0.1 });
  const delay = (index % 3) * 100;

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${post.id}`}
      ref={ref}
      className={cn(
        'group block',
        isVisible ? 'animate-fade-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <article className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-medium text-accent-foreground mb-3">
            {post.category}
          </span>

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
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

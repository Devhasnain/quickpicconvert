import { ChevronRight, Home } from "lucide-react";
import Script from "next/script";
import Link from "next/link";


type BreadcrumbItem = {
  name: string;
  href: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const siteUrl = "https://quickpicconvert.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-gray-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index === 0 && <Home className="w-3.5 h-3.5" aria-hidden="true" />}

                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-gray-500 font-medium line-clamp-1 max-w-50 sm:max-w-md"
                  >
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
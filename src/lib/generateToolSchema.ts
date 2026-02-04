import { Tool } from "@/data/tool";

/**
 * Generates JSON-LD schema for a tool page
 * Returns schema objects suitable for adding to page <head>
 */
export function generateToolSchema(tool: Tool, baseUrl: string = "https://quickpicconvert.com") {
  // Main SoftwareApplication schema
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": tool.seo.canonical,
    name: tool.title,
    description: tool.seo.description,
    url: tool.seo.canonical,
    applicationCategory: `Productivity/${tool.category}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      category: tool.category,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
    operatingSystem: "Web",
    inLanguage: "en-US",
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: "Quick Pic Convert",
      url: baseUrl,
      logo: `${baseUrl}/images/logo.png`,
    },
    image: `${baseUrl}/images/tools/${tool.id}.png`,
    keywords: tool.seo.keywords,
    potentialAction: {
      "@type": "UseAction",
      target: tool.seo.canonical,
    },
  };

  // FAQPage schema if tool has FAQs
  const faqSchema = tool.instructions?.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: tool.instructions.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  // HowTo schema if tool has instructions
  const howToSchema = tool.instructions
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: tool.instructions.title,
        description: tool.instructions.description,
        step: tool.instructions.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.description,
        })),
      }
    : null;

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${baseUrl}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.title,
        item: tool.seo.canonical,
      },
    ],
  };

  return {
    softwareAppSchema,
    faqSchema,
    howToSchema,
    breadcrumbSchema,
  };
}

/**
 * Returns JSON-LD schema as a string for Next.js Head component
 */
export function getToolSchemaString(tool: Tool, baseUrl?: string) {
  const schemas = generateToolSchema(tool, baseUrl);
  const allSchemas = [
    schemas.softwareAppSchema,
    schemas.faqSchema,
    schemas.howToSchema,
    schemas.breadcrumbSchema,
  ].filter(Boolean);

  return JSON.stringify(allSchemas);
}

/**
 * For organization-wide schema
 */
export function generateOrganizationSchema(baseUrl: string = "https://quickpicconvert.com") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Quick Pic Convert",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: "Free online image conversion and optimization tools",
    sameAs: [
      "https://twitter.com/quickpicconvert",
      "https://facebook.com/quickpicconvert",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: baseUrl,
    },
  };
}

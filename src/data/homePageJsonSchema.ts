import { Download, Settings, Upload } from "lucide-react";

import { toolObject } from "./toolcards";
import { Reviews } from "./reviews";


export const hotItWorksSteps = [
    {
        icon: Upload,
        step: "01",
        title: "Upload Your Image",
        description:
            "Drag and drop or click to select your images. We support all popular formats.",
    },
    {
        icon: Settings,
        step: "02",
        title: "Choose Settings",
        description:
            "Select output format, adjust quality, resize dimensions — customize as needed.",
    },
    {
        icon: Download,
        step: "03",
        title: "Download Result",
        description:
            "Get your converted image instantly. No watermarks, no limits, no sign-up.",
    },
];
type Props = {
    faqs: { q: string, a: string }[] | []
}
export const homePageJsonSchema = ({ faqs }: Props) => {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://quickpicconvert.com/#website",
                "url": "https://quickpicconvert.com/",
                "name": "QuickPicConvert",
                "alternateName": "Quick Pic Convert",
                "description": "Quick Pic Convert is a free, browser based image converter. Convert PNG, JPG, and WebP images fast and private, with no upload and no sign up.",
                "inLanguage": "en",
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://quickpicconvert.com/#organization",
                    "name": "QuickPicConvert",
                    "url": "https://quickpicconvert.com/",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://quickpicconvert.com/logo-lg.png",
                        "width": 512,
                        "height": 512
                    },
                    "email": "your-email@quickpicconvert.com",
                    "sameAs": [
                        "https://github.com/Devhasnain/quickpicconvert.git"
                    ]
                }
            },
            {
                "@type": "ItemList",
                "@id": "https://quickpicconvert.com/#tools",
                "name": "Free Image Converter Tools",
                "description": "All image conversion tools available on Quick Pic Convert.",
                "numberOfItems": 6,
                "itemListElement":
                    toolObject.map((t,i) => ({
                        "@type": "ListItem",
                        "position": i + 1,
                        "item": {
                            "@type": "SoftwareApplication",
                            "name": t.title,
                            "url": `https://quickpicconvert.com/${t.slug}`,
                            "description": t.excerpt,
                            "applicationCategory": "MultimediaApplication",
                            "operatingSystem": "Any",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD"
                            }
                        }
                    }))

            },
            {
                "@type": "HowTo",
                "@id": "https://quickpicconvert.com/#howto",
                "name": "How to Convert Images with QuickPicConvert",
                "description": "Follow these simple steps to convert PNG, JPG, and WebP images for free in your browser.",
                "totalTime": "PT1M",
                "estimatedCost": {
                    "@type": "MonetaryAmount",
                    "currency": "USD",
                    "value": "0"
                },
                "tool": [
                    {
                        "@type": "HowToTool",
                        "name": "A modern web browser such as Chrome, Edge, Firefox, or Safari"
                    }
                ],
                "step":
                    hotItWorksSteps.map((s,i) => (
                        {
                            "@type": "HowToStep",
                            "position": i + 1,
                            "name": s.title,
                            "text": s.description,
                            "url": "https://quickpicconvert.com/#step-1"
                        }
                    ))
            },
            {
                "@type": "WebApplication",
                "@id": "https://quickpicconvert.com/#app",
                "name": "QuickPicConvert",
                "url": "https://quickpicconvert.com/",
                "description": "A free, private, browser based image converter for PNG, JPG, and WebP.",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Any",
                "browserRequirements": "Requires JavaScript and a modern web browser",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "bestRating": "5",
                    "worstRating": "1",
                    "ratingCount": "120",
                    "reviewCount": "120"
                },
                "review":
                    Reviews.map((r) => (
                        {
                            "@type": "Review",
                            "author": {
                                "@type": "Person",
                                "name": r.name
                            },
                            "datePublished": "2026-09-01",
                            "reviewRating": {
                                "@type": "Rating",
                                "ratingValue": r.rating,
                                "bestRating": "5",
                                "worstRating": "1"
                            },
                            "reviewBody": r.text
                        }
                    ))
            },
            {
                "@type": "FAQPage",
                "@id": "https://quickpicconvert.com/#faq",
                "mainEntity": faqs.map((r) => ({
                    "@type": "Question",
                    "name": r.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": r.a
                    }
                }))
            }
        ]
    }
}
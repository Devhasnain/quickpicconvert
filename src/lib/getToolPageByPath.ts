import { toolObject } from "@/data/toolcards";
import { BreadCrumb } from "@/types";

import { getToolPageBySlug } from "./api";


function parseSchema(raw: string, options: { questionLabel: string, answerLabel: string } = { questionLabel: "Q", answerLabel: "A" }) {
    const {
        questionLabel = 'Q',
        answerLabel = 'A',
    } = options;

    if (!raw) return [];

    const blocks = raw.trim().split(/\n\s*\n/); // split on blank lines

    // Escape labels in case they contain regex-special characters
    const escape = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const qLabel = escape(questionLabel);
    const aLabel = escape(answerLabel);

    const pattern = new RegExp(`${qLabel}:\\s*(.+?)\\s*\\n${aLabel}:\\s*([\\s\\S]+)`);

    const faqs = [];

    for (const block of blocks) {
        const match = block.trim().match(pattern);
        if (match) {
            faqs.push({
                question: match[1].trim(),
                answer: match[2].trim(),
            });
        }
    }

    return faqs;
}

export const getToolPageByPath = async (slug: string): Promise<{ props: { toolPage?: any, breadcrumb: BreadCrumb[], jsonSchemas: any[] | [] }, notFound?: boolean, revalidate?: number, }> => {
    try {

        const res = await getToolPageBySlug(slug);
        const toolPage = res.data?.data?.toolPage;
        const toolPageJsonSchema = toolPage.toolPageJsonSchema;
        const toolCard = toolObject.find((item) => item.slug === slug)

        return {
            props: {
                toolPage,
                jsonSchemas: [
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQ",
                        mainEntity: parseSchema(toolPageJsonSchema.faqs, { questionLabel: "Q", answerLabel: "A" }).map((faq) => ({
                            "@type": "Question",
                            name: faq.question,
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: faq.answer,
                            },
                        })),
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        name: toolPageJsonSchema.howToTitle,
                        description: toolPageJsonSchema.howToDescription,
                        step: parseSchema(toolPageJsonSchema.howTo, { questionLabel: "Q", answerLabel: "A" }).map((step, index) => ({
                            "@type": "HowToStep",
                            position: index + 1,
                            name: step.question,
                            text: step.answer,
                        })),
                    }
                ],
                breadcrumb: [
                    {
                        name: "Home",
                        href: "/"
                    },
                    {
                        name: "Tools",
                        href: "/tools"
                    },
                    {
                        name: toolCard?.title || "",
                        href: `/tools/${toolCard?.slug}`
                    },
                ]
            },
            revalidate: 300,
        };
    } catch (error: any) {
        return {
            props: {
                toolPage: null,
                breadcrumb: [],
                jsonSchemas: []
            },
            notFound: true,
        };
    }
};

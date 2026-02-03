import { Award, Heart, Target, Users } from "lucide-react";


export const aboutContent = {
    stats: [
        { value: "10M+", label: "Images Converted" },
        { value: "500K+", label: "Happy Users" },
        { value: "50+", label: "Countries" },
        { value: "99.9%", label: "Uptime" },
    ],
    values: [
        {
            icon: Users,
            title: "User First",
            description:
                "Every feature we build starts with our users' needs. We listen, iterate, and improve constantly.",
        },
        {
            icon: Target,
            title: "Simplicity",
            description:
                "We believe powerful tools don't need to be complicated. Simple is better.",
        },
        {
            icon: Heart,
            title: "Privacy Matters",
            description:
                "Your images are yours. We process everything locally and never store your files.",
        },
        {
            icon: Award,
            title: "Quality Focus",
            description:
                "We never compromise on output quality. Your images deserve the best treatment.",
        },
    ],
    team: [
        {
            name: "Tanveer Admed",
            role: "Founder & CEO",
            avatar: "TA",
            profile: "hasnain-alam",
            image: "/team/tanveer-ahmed.webp"
        },
        {
            name: "Hasnain Alam",
            role: "Lead Developer",
            avatar: "HA",
            profile: "tanveer-admed",
            image: "/team/hasnain-alam.webp"
        },
    ]
}
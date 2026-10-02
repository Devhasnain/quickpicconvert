import { Container } from "@/components";
import { socialLinks } from "@/data";
import Link from "next/link";

import { Logo } from "../components";


const footerLinks = {
  company: [
    {
      name: "About Us",
      path: "/about",
    },
     {
      name: "Tools",
      path: "/tools",
    },
     {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
  ],
  team: [
    // { name: "Tanveer Ahmed", path: "/team/tanveer-ahmed" },
    { name: "Hasnain Alam", path: "/team/hasnain-alam" },
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container element="div">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo className="" />
            <p className="text-muted-foreground leading-relaxed mb-4 mt-2 max-w-sm">
              Fast, free, and secure image conversion tools. Convert, compress,
              and resize your images instantly in your browser.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white w-10 h-10 rounded-lg bg-primary border border-primary flex items-center justify-center"
                  target="_blank"
                  rel="nofollow"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

           {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-xl">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="font-medium text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Team Links */}
          <div>
            <h4 className="font-semibold text-foreground text-xl mb-4">Team</h4>
            <ul className="space-y-3">
              {footerLinks.team.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="font-medium text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground text-xl mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="font-medium text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 text-center py-5">
            <p className="">
              © {new Date().getFullYear()} Quick Pic Convert. All rights
              reserved.
            </p>
        </div>
      </Container>
    </footer>
  );
}

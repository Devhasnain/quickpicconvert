import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

import Logo from '../Logo';


const footerLinks = {
  product: [
    { name: 'Image Converter', path: '/tools/image-converter' },
    { name: 'Png to Jpeg', path: '/tools/png-to-jpg' },
    { name: 'Jpeg to Png', path: '/tools/png-to-jpg' },
    { name: 'Image to base64', path: '/tools/image-to-base64' },
    { name: 'Image Compressor', path: '/tools/image-compressor' },
  ],
  team: [
    { name: 'Tanveer Ahmed', path: '/team/tanveer-ahmed' },
    { name: 'Hasnain Alam', path: '/team/hasnain-alam' },
  ],
  legal: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@quickpicconvert.com', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo className='mb-4' />
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Fast, free, and secure image conversion tools. Convert, compress, and resize your images instantly in your browser.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Team</h4>
            <ul className="space-y-3">
              {footerLinks.team.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Quick Pic Convert. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ for creators worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

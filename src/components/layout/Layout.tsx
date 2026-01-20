import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Navbar } from './Navbar';
import { Footer } from './Footer';


interface LayoutProps {
  children: ReactNode;
}

let hideNavbar = ['/tools/image-converter']

export function Layout({ children }: LayoutProps) {
  const pathname = useRouter().pathname;
  return (
    <div className="min-h-screen flex flex-col">
      {hideNavbar.includes(pathname) ? "": <Navbar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Navbar } from './Navbar';
import { Footer } from './Footer';


interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = useRouter().pathname;
  return (
    <div className="min-h-screen flex flex-col">
      {pathname.includes('/tools/') ? "": <Navbar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

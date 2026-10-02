import { ReactNode, useState } from "react";
import { Poppins } from "next/font/google";

import { SidbarMenu } from "./SidbarMenu";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";


const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      <Navbar setOpenSidebar={setOpenSidebar} />
      <SidbarMenu setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
      <main className={`${poppins.className}`}>{children}</main>
      <Footer />
    </>
  );
}

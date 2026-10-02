import { ChevronDown, Menu } from "lucide-react";
import { toolCards } from "@/data";
import { useState } from "react";
import Link from "next/link";

import { Logo } from "../components";


type Props = {
  setOpenSidebar:(val:boolean)=>void;
}

export function Navbar({setOpenSidebar}:Props) {
  const [showToolsMenu, setShowToolsMenu] = useState(false);

  return (
    <header className="sticky top-0 bg-white z-50 border-b border-gray-200 py-1.5 transition-all duration-300">
      <div className="px-2.5 md:px-5 grid grid-cols-12 items-center">
        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <Logo />
        </div>
        <nav className="hidden sm:flex pl-10 sm:pl-0 relative sm:col-span-6 lg:col-span-8 justify-start lg:justify-center items-center pt-1.5">
          <ul className="flex flex-row items-center justify-start lg:justify-center gap-5 xl:gap-12 ">
            {toolCards
              .filter((t) => t.mainLink)
              .map((t, i) => (
                <li key={i}>
                  <Link
                    href={t.slug}
                    className={`hidden lg:block hover:text-primary uppercase font-medium text-sm`}
                  >
                    {t.title}
                  </Link>
                </li>
              ))}
            <li
              className={`flex flex-row items-center gap-3 group font-medium text-sm ${
                showToolsMenu ? "text-primary" : ""
              } hover:text-primary cursor-pointer uppercase`}
              onClick={() => setShowToolsMenu(!showToolsMenu)}
            >
              <span className="hidden lg:block">More Tools</span>
              <span className="block lg:hidden">Image Converter Tools</span>
              <ChevronDown
                size={20}
                className={`${showToolsMenu ? "rotate-180" : "rotate-0"}`}
              />
            </li>
            {showToolsMenu && (
              <li className="absolute top-12 border border-gray-200 left-0 w-full shadow-xl rounded-lg bg-white font-medium">
                <ul className="p-8 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-center gap-x-12 gap-y-6">
                  {toolCards
                    .filter((t) => !t.mainLink)
                    .map((t, i) => (
                      <li key={i}>
                        <Link
                          href={t.slug}
                          className="hover:text-primary leading-relaxed"
                        >
                          {t.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            )}
          </ul>
        </nav>
        <div className="col-span-6 sm:col-span-3 lg:col-span-2 flex flex-row justify-end pt-0 md:pt-1.5 gap-3">
          <Link href={"/tools/image-converter"} className="cursor-pointer bg-primary hover:bg-primary/90 py-2.5 px-3 hidden sm:block md:px-4 xl:px-5 rounded-lg font-medium text-white">
            Optimize for WEB
          </Link>
          <button onClick={()=>setOpenSidebar(true)} className="block sm:hidden p-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-400">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}

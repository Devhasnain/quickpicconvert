import { Logo } from "@/components";
import { toolCards } from "@/data";
import { X } from "lucide-react";
import Link from "next/link";


type Props = {
  openSidebar: boolean;
  setOpenSidebar: (val: boolean) => void;
};

export const SidbarMenu = ({ openSidebar, setOpenSidebar }: Props) => {
  return (
    <nav
      className={`w-70 h-screen overflow-y-auto transition-all duration-300 space-y-3 fixed z-50 top-0 ${
        openSidebar ? "left-0" : "-left-80"
      } bg-white px-2.5 py-1.5 shadow border border-gray-200`}
    >
      <div className="flex flex-row items-center justify-between">
        <Logo />

        <button
          onClick={() => setOpenSidebar(false)}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-400"
        >
          <X size={22} />
        </button>
      </div>

      <h3 className="text-lg font-semibold">Image Converter Tools</h3>

      <nav>
        <ul className="flex flex-col gap-2">
          {toolCards.map((t, i) => (
            <li key={i}>
              <Link
                href={t.slug}
                className={`hover:text-primary font-medium text-sm`}
              >
                {t.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </nav>
  );
};

import { memo, ReactNode } from "react";

import LogoShaped from "../LogoShaped";


type Props = {
  children: ReactNode;
  toolBar?: ReactNode;
};

const HeroBackground = ({ children, toolBar }: Props) => {
  return (
    <section
      className={
        "relative overflow-hidden min-h-screen gradient-bg pb-4 sm:pb-0"
      }
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

      <div className="grid grid-cols-12 h-[100vh] px-5">
        <div className="sm:col-span-3 col-span-12  pt-2">
          <LogoShaped />
          {toolBar && <div className="mt-4">{toolBar}</div>}
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </section>
  );
};

export default memo(HeroBackground);

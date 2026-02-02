import { memo, ReactNode } from 'react';
import Image from 'next/image';

import Logo from '../Logo';


type Props = {
    children:ReactNode
}

const HeroBackground = ({children}:Props) => {
  return (
            <div
          className={
            "relative overflow-hidden min-h-screen gradient-bg pb-4 sm:pb-0"
          }
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          {/* <div className="absolute -top-48 -left-28 md:-top-44 md:-left-24 xl:-top-44 xl:-left-16"> */}
          <Image
            alt=""
            src={"/images/shape-light.png"}
            width={400}
            height={400}
            className="absolute -top-40 -left-24 sm:-top-48 sm:-left-28 md:-top-44 md:-left-24 xl:-top-44 xl:-left-16"
          />
          <Logo className="absolute  xl:top-2 xl:left-10 md:top-3 md:left-5 z-9999" />
          {children}
          </div>
  )
}

export default memo(HeroBackground)
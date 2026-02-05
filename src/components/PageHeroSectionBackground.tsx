import { memo, ReactNode } from "react";
import Image from "next/image";


type Props = {
  children: ReactNode;
  ariaLabel?: string;
  imageTitle?: string;
  imageAlt?: string;
  className?:string;
};

const PageHeroSectionBackground = ({
  children,
  ariaLabel = "Quick Pic Converter Hero Section",
  imageTitle = "Online image converter background for JPG PNG and WebP conversion",
  imageAlt = "Online image converter background for JPG PNG and WebP conversion",
  className = "min-h-screen"
}: Props) => {
  return (
    <section
      className={`relative flex items-center pt-20 overflow-hidden ${className}`}
      aria-label={ariaLabel}
    >
      <span className="moving-balls" />
      <span className="moving-balls" />
      <span className="moving-balls" />
      <span className="moving-balls" />
      <span className="moving-balls" />
      <span className="moving-balls" />
      <span className="moving-balls" />
      <span className="moving-balls" />

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.webp"
          title={imageTitle}
          alt={imageAlt}
          width={800}
          height={800}
          className="w-full h-full object-cover opacity-40"
          preload={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

      {children}
    </section>
  );
};

export default memo(PageHeroSectionBackground);

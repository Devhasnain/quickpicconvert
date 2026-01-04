import { Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className} bg-transparent!`}>
      <div className="rounded-xl flex items-center justify-center bg-transparent!">
        {/* <Zap className="w-5 h-5 text-primary-foreground" /> */}
        <Image alt="Quick-pic-convert-logo" className="bg-transparent!" src={"/logo-cropped.png"} height={60} width={60} />
      </div>
      <div className="flex flex-col justify-center text-xl font-bold text-foreground">
        <span style={{ lineHeight: "20px" }} className="">
          Quick Pic
        </span>
        <span style={{ lineHeight: "20px" }} className="gradient-text">
          Convert
        </span>
      </div>
    </Link>
  );
};

export default Logo;

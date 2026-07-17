import Image from "next/image";
import Link from "next/link";
import { memo } from "react";


const LogoShaped = () => {
  return (
    <Link
      href={"/"}
      className="flex flexflex items-center group bg-transparent! relative"
    >
      <div className="z-10 rounded-xl flex items-center justify-center bg-transparent!">
        <Image
          alt="Quick-pic-convert-logo"
          className="bg-transparent!"
          src={"/logo-cropped.png"}
          height={60}
          width={60}
        />
      </div>
      <div className="z-10 flex flex-col text-white justify-center text-xl font-bold text-foreground">
        <span style={{ lineHeight: "20px" }} className="">
          Quick Pic
        </span>
        <span style={{ lineHeight: "20px" }} className="">
          Convert
        </span>
      </div>
    </Link>
  );
};

export default memo(LogoShaped);

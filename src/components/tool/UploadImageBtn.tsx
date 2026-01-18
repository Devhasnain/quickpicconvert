import { icons } from "lucide-react";
import Image from "next/image";
import { memo } from "react";


type Props = {
  onClick: () => void;
};

const UploadImageBtn = ({ onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-row items-center justify-center"
    >
      <div className="h-80 w-80 relative">
        <Image
          alt=""
          src="/images/shape-dark-1.png"
          width={500}
          height={500}
          className="absolute inset-0 opacity-50 w-full h-full object-cover animate-spin-slow-reverse"
        />

        <Image
          alt=""
          src="/images/shape-dark-2.png"
          width={500}
          height={500}
          className="absolute inset-0 opacity-50 w-full h-full object-cover animate-spin-slow"
        />

        <Image
          alt=""
          src="/images/shape-light.png"
          width={500}
          height={500}
          className="absolute inset-0 opacity-50 w-full h-full object-cover animate-spin-slow-reverse"
        />
        <Image
          alt=""
          src="/images/shape-dark.png"
          width={500}
          height={500}
          className="absolute inset-0 opacity-60 w-full h-full object-cover animate-spin-slow"
        />

        <div className="flex flex-col text-white items-center justify-center h-full w-full absolute top-0 left-0 text-center px-4">
          <icons.ImagePlus className="w-16 h-16 mb-3" />
          <span className="text-xl ">Upload Images</span>
        </div>
      </div>
    </div>
  );
};

export default memo(UploadImageBtn);

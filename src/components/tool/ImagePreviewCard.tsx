import { X } from "lucide-react";
import Image from "next/image";
import { memo } from "react";


type Props = {
  file: File | any;
  onClick: () => void;
};

const ImagePreviewCard = ({ onClick, file }: Props) => {
  return (
    <div className="h-24 w-24 transition-all group dashedBorder rounded-md overflow-hidden relative">
      <X
        onClick={onClick}
        className="cursor-pointer transition-all hidden group-hover:block absolute top-1 right-1 p-1 bg-white shadow border rounded-full"
      />
      <Image
        alt={file?.name}
        src={URL.createObjectURL(file)}
        height={100}
        width={100}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default memo(ImagePreviewCard);

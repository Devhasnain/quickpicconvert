import Link from "next/link";


type Props = {
  className?: string;
};

export const Logo = ({ className }: Props) => {
  return (
    <Link href="/" className={`${className}`}>
      <div className="flex flex-row gap-1.5 text-2xl font-semibold">
        <span  className="">
          Quick
        </span>
        <span  className="text-primary font-bold">
          Pic
        </span>
        <span  className="">
          Convert
        </span>
      </div>
    </Link>
  );
};

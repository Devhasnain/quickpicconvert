import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";


type Props = {
  children?: ReactNode;
  varient?: "solid" | "outlined";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (val?: any) => void;
  type?: "button" | "submit";
};
export const Button = ({
  children,
  varient = "solid",
  loading,
  disabled,
  className,
  type = "button",
  onClick,
}: Props) => {
  const btnVarients = {
    solid: "bg-primary text-white",
    outlined:
      "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
  };
  return (
    <button
      type={type}
      onClick={loading || disabled ? ()=>{}: onClick}
      disabled={disabled || loading}
      className={`
        ${btnVarients[varient]}
        ${
          loading || disabled
            ? "cursor-not-allowed bg-primary/50"
            : "cursor-pointer  hover:-translate-y-1"
        } w-full py-4 px-2 sm:px-6 rounded-xl  font-medium  transition-all duration-300 flex flex-row itemsc-center justify-center ${className}`}
    >
      {loading ? (
        <LoaderCircle className="animate-spin text-white" />
      ) : (
        children
      )}
    </button>
  );
};

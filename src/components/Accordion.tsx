import { ChevronDown } from "lucide-react";
import { useState } from "react";


type Props = {
  title: string;
  description: string;
};
export const Accordion = ({ title, description }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 bg-white px-4.5 py-4 rounded-xl overflow-hidden transition-all duration-500">
      <div className="flex flex-row items-center gap-5 justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 w-12 flex hover:bg-gray-100 cursor-pointer flex-col items-center justify-center border border-gray-200 rounded-full"
        >
          <ChevronDown />
        </button>
      </div>
      <p
        className={`${
          isOpen ? "h-auto" : "h-0"
        } overflow-hidden transition-all duration-200`}
      >
        {description}
      </p>
    </div>
  );
};

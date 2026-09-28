import { ReactNode } from "react";


type Props = {
  children: ReactNode;
  element: "section" | "div";
  className?:string
};

export const Container = ({ children, element, className }: Props) => {
  const getElement = (element: string) => {
    switch (element) {
      case "section":
        return <section className={`px-2.5 md:px-0 w-full md:w-10/12 mx-auto ${className}`}>{children}</section>;

      default:
        return <div className={`px-2.5 md:px-0 w-full md:w-10/12 mx-auto ${className}`}>{children}</div>;
    }
  };
  return <>{getElement(element)}</>;
};

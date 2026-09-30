import { ReactNode } from "react";


type Props = {
  children: ReactNode;
  element: "section" | "div";
  className?:string
  id?:string
};

export const Container = ({ children, element, className, id}: Props) => {
  const getElement = (element: string) => {
    switch (element) {
      case "section":
        return <section id={id} className={`px-2.5 md:px-0 w-full md:w-10/12 mx-auto ${className}`}>{children}</section>;

      default:
        return <div id={id} className={`px-2.5 md:px-0 w-full md:w-10/12 mx-auto ${className}`}>{children}</div>;
    }
  };
  return <>{getElement(element)}</>;
};

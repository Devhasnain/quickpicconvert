import React from "react";

import { Container } from "./Container";


type Props = {
  btnText?: string;
  onClick: () => void;
};
export const SelectImageButton = ({ onClick, btnText }: Props) => {
  return (
    <Container
      element="div"
      className="py-10 md:py-20 flex flex-col items-center justify-center"
    >
      <button
        onClick={onClick}
        className="cursor-pointer inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg bg-primary md:text-lg text-white font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
      >
        Select Image
      </button>
    </Container>
  );
};

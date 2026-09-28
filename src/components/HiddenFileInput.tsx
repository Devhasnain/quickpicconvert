import { ChangeEvent, LegacyRef, memo } from "react";


type Props = {
  ref: LegacyRef<HTMLInputElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  multiple: boolean;
  accept: string;
};

export const HiddenFileInput = ({ ref, onChange, multiple, accept }: Props) => {
  return (
    <input
      ref={ref}
      type="file"
      multiple={multiple}
      accept={accept}
      onChange={onChange}
      className="hidden"
    />
  );
};
import { useRouter } from "next/router";
import { memo } from "react";

import { Button } from "./ui/button";


const NotFound = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.back();
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Button className="cursor-pointer" onClick={handleOnClick} asChild>
          Back
        </Button>
      </div>
    </div>
  );
};

export default memo(NotFound);

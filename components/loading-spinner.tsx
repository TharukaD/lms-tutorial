import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  size?: number;
};

const LoadingSpinner = ({ size = 10 }: Props) => {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader2 className={`h-${size} w-${size} text-sky-700 animate-spin`} />
    </div>
  );
};

export default LoadingSpinner;

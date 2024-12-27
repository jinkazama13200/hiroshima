import { Frown } from "lucide-react";

const NoResult = ({ size = 50 }) => {
  return (
    <div className="flex items-center justify-center gap-2 text-lg text-secondary-default lg:gap-4">
      <Frown size={size} />
      <span>no result.</span>
    </div>
  );
};

export default NoResult;
    
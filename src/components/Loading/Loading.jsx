import { LoaderCircle } from "lucide-react";

const Loading = ({ children, size = 50 }) => {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-[50%] -translate-y-[50%] items-center justify-center gap-2 lg:-translate-x-[0]">
      <LoaderCircle
        size={size}
        className="animate-spin text-secondary-default"
      />
      <span>Loading {children}...</span>
    </div>
  );
};

export default Loading;

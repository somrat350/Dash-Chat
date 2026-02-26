import { LoaderIcon } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <LoaderIcon className="size-20 animate-spin" />
    </div>
  );
};

export default PageLoader;

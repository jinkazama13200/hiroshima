import { Search } from "lucide-react";
import Button from "../Button/Button";

const Searchbar = ({ className }) => {
  return (
    <form className={`items-center justify-center lg:flex ${className || ""}`}>
      <div className="flex max-w-[400px] flex-grow">
        <input
          className="w-full rounded-l-full border border-r-0 border-secondary-default px-4 shadow-inner outline-none focus:shadow-secondary-default"
          type="text"
          placeholder="Search..."
        />
        <Button
          variant="ghost"
          className="rounded-l-none rounded-r-full border border-secondary-default px-5 py-2"
        >
          <Search />
        </Button>
      </div>
    </form>
  );
};

export default Searchbar;

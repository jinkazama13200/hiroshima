import React from "react";
import Button from "../Button/Button";

import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <div className="sticky flex items-center justify-between rounded-lg border p-4 shadow-md transition-all hover:shadow-secondary-default">
      <div className="flex flex-shrink-0 items-center justify-center">
        <h1
          onClick={() => window.location.replace("/")}
          id="logo"
          className="cursor-pointer select-none text-2xl font-bold uppercase"
        >
          hiroshima
        </h1>
      </div>
      <div className="flex flex-shrink-0 gap-2 lg:gap-4">
        <Button size="icon">
          <Bell />
        </Button>
        <Button size="icon">
          <User />
        </Button>
      </div>
    </div>
  );
};

export default Header;

import { buttonStyles } from "../Button/Button";
import { twMerge } from "tailwind-merge";
import { Link, useLocation } from "react-router-dom";
import { Film, Home, Users } from "lucide-react";

const Menubar = () => {
  return (
    <div className="fixed bottom-5 left-1/2 flex -translate-x-[50%] items-center justify-center gap-2 rounded-full bg-white p-2 shadow-md lg:hidden">
      <MenubarItem Icon={Home} url="/" />
      <MenubarItem Icon={Film} url="/movies" />
      <MenubarItem Icon={Users} url="/users" />
    </div>
  );
};

const MenubarItem = ({ Icon, title, url }) => {
  const location = useLocation();
  return (
    <Link
      to={`${url}`}
      className={twMerge(
        buttonStyles({ variant: "ghost", size: "icon" }),
        `flex w-full items-center shadow-md ${url === location.pathname ? "bg-secondary-default text-white shadow-secondary-default" : undefined} `,
      )}
    >
      <Icon className="h-5 w-5" />
      <div className="text-sm">{title}</div>
    </Link>
  );
};

export default Menubar;

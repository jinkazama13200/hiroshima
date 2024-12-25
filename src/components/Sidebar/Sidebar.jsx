import { Film, Home, Users } from "lucide-react";
import { buttonStyles } from "../Button/Button";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <aside className="top-0 hidden h-screen w-56 flex-col gap-2 overflow-y-auto border border-r p-2 lg:sticky lg:flex">
        <LargeSidebarItem isActive Icon={Home} title="home" url="/" />
        <LargeSidebarItem Icon={Film} title="movies management" url="/movies" />
        <LargeSidebarItem Icon={Users} title="users management" url="/users" />
      </aside>
    </>
  );
};

const LargeSidebarItem = ({ Icon, title, url }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <a
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `flex gap-2 rounded-md px-5 ${url === location.pathname ? "bg-secondary-default text-white" : undefined} `,
      )}
      onClick={() => navigate(url)}
    >
      <Icon className="h-6 w-6" />
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </div>
    </a>
  );
};

export default Sidebar;

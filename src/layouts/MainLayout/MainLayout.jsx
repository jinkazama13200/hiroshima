import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Menubar from "../../components/Menubar/Menubar";

const MainLayout = () => {
  return (
    <div className="max-h-screen lg:grid lg:grid-cols-[auto,1fr]">
      <Sidebar />
      <div className="m-2 flex flex-col gap-2 overflow-auto lg:m-5 lg:gap-4">
        <Header />
        <Outlet />
        <Menubar />
      </div>
    </div>
  );
};

export default MainLayout;

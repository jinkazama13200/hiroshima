import { CircleX, EditIcon } from "lucide-react";
import React from "react";
import Button from "../../components/Button/Button";

const MovieItem = ({ hinhAnh, maPhim, biDanh, tenPhim }) => {
  return (
    <div className="flex items-center justify-center gap-2 overflow-hidden rounded-md px-3 py-1 shadow-md lg:gap-4 hover:bg-gray-300 transition-colors ">
      <img
        className="rounded-md"
        width={100}
        height={100}
        src={hinhAnh}
        alt={biDanh}
      />
      <div className="flex flex-1 flex-col gap-2 overflow-hidden lg:gap-4">
        <span className="inline-block w-full rounded-md bg-secondary-default p-2 text-white">
          {maPhim}
        </span>
        <h3 className="overflow-hidden truncate whitespace-nowrap">
          {tenPhim}
        </h3>
        <div className="flex items-center justify-start gap-2 lg:gap-4">
          <Button>
            <EditIcon />
          </Button>
          <Button className="bg-red-400 hover:bg-red-600">
            <CircleX />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;

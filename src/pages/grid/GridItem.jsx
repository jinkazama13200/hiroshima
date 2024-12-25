import React from "react";

const GridItem = ({ taiKhoan, email, index }) => {
  return (
    <div className="flex flex-col max-w-full items-center gap-2 rounded-lg p-5 shadow-lg">
      <div className="flex size-40 flex-shrink-0 items-center justify-center overflow-hidden rounded-full shadow-lg">
        {index + 1}
      </div>
      <div className="flex flex-col gap-2 overflow-hidden">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          {taiKhoan}
        </div>
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          {email}
        </div>
      </div>
    </div>
  );
};

export default GridItem;

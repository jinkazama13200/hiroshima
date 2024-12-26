import { ArrowBigLeftIcon, ArrowBigRightIcon } from "lucide-react";
import { buttonStyles } from "../Button/Button";

import { twMerge } from "tailwind-merge";
import ReactPaginate from "react-paginate";

const PaginationBar = ({ currentPage, totalPages, onSetCurrentPage }) => {
  const handlePageCLick = ({ selected }) => {
    onSetCurrentPage(selected + 1);
  };

  return (
    <ReactPaginate
      className="my-1 flex items-center justify-center gap-3"
      breakLabel="..."
      activeClassName="text-white rounded-full"
      pageLinkClassName={twMerge(
        buttonStyles({ size: "icon" }),
        "size-8 text-sm",
      )}
      previousLabel={
        <ArrowBigLeftIcon
          className={` ${currentPage !== 1 ? `text-secondary-default` : `text-gray-600`} `}
        />
      }
      nextLabel={
        <ArrowBigRightIcon
          className={`${currentPage !== totalPages ? "text-secondary-default" : "text-gray-600"}`}
        />
      }
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={handlePageCLick}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
    />
  );
};

export default PaginationBar;

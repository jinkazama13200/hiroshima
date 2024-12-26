import { useEffect, useState } from "react";
import { getUsers } from "../../apis/usersAPI";
import ReactPaginate from "react-paginate";

import { CircleX, Edit, LoaderCircle, User } from "lucide-react";
import Searchbar from "../../components/Searchbar";
import Button, { buttonStyles } from "../../components/Button/Button";
import { twMerge } from "tailwind-merge";

const Users = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const limit = 5;

  const theadData = ["Username", "Position", "Settings"];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers(currentPage, limit);
      setTotalPages(response?.totalPages);
      if (Array.isArray(response?.items) && response?.items.length) {
        setData(response?.items);
      }
    } catch (error) {
      setLoading(false);
      throw new Error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
    console.log("Current Page:", currentPage);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  return (
    <>
      <div className="flex w-full justify-between">
        <Searchbar className="flex-grow md:flex-grow-0" />
      </div>
      {loading ? (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-[50%] -translate-y-[50%] items-center justify-center gap-2 lg:-translate-x-[0]">
          <LoaderCircle
            size={40}
            className="animate-spin text-secondary-default"
          />
          <span>Loading users...</span>
        </div>
      ) : (
        <div className="relative flex w-full flex-col shadow-md">
          <div className="flex overflow-auto overflow-x-hidden">
            <table className="w-full table-auto text-left">
              <thead className="text-left uppercase">
                <tr>
                  {theadData.map((item) => {
                    return <th key={item}>{item}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => {
                    return (
                      <tr
                        className="transition-colors hover:bg-gray-300"
                        key={index}
                      >
                        <td className="p-2">
                          <div className="flex items-center gap-1 overflow-hidden">
                            <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border">
                              <User />
                            </div>
                            <div className="max-w-[100px] overflow-hidden md:max-w-full">
                              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {item.taiKhoan}
                              </div>
                              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {item.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-2">
                          {item.maLoaiNguoiDung === "QuanTri"
                            ? "Admin"
                            : "Customer"}
                        </td>
                        <td className="p-2">
                          <div className="flex flex-shrink-0 gap-1">
                            <Button onClick={() => setOpen(true)} size="icon">
                              <Edit />
                            </Button>
                            <Button
                              className="bg-red-400 hover:bg-red-600"
                              size="icon"
                            >
                              <CircleX />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {totalPages > 0 && (
        <ReactPaginate
          className="my-1 flex items-center justify-center gap-3"
          breakLabel="..."
          activeClassName="text-white rounded-full"
          pageLinkClassName={twMerge(
            buttonStyles({ size: "icon" }),
            "size-8 text-sm",
          )}
          nextLabel=">"
          previousLabel="<"
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          pageCount={totalPages}
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
};

export default Users;

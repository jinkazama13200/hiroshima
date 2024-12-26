import { CircleX, Edit, User } from "lucide-react";
import Button from "../../components/Button/Button";

const UsersTable = ({ data, thead = [] }) => {
  return (
    <div className="relative flex w-full flex-col shadow-md">
      <div className="flex overflow-auto overflow-x-hidden">
        <table className="w-full table-auto text-left">
          <thead className="text-left uppercase">
            <tr>
              {thead &&
                thead.map((item) => {
                  return <th key={item}>{item}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                const { taiKhoan, email, maLoaiNguoiDung } = item;
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
                            {taiKhoan}
                          </div>
                          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                            {email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      {maLoaiNguoiDung === "QuanTri" ? "Admin" : "Customer"}
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
  );
};

export default UsersTable;

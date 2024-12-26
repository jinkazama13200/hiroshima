import { useEffect, useState } from "react";
import { getUsers } from "../../apis/usersAPI";

import Searchbar from "../../components/Searchbar";
import Loading from "../../components/Loading/Loading";
import PaginationBar from "../../components/PaginationBar/PaginationBar";
import UsersTable from "./UsersTable";

const Users = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 5;

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

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  return (
    <>
      <div className="flex w-full">
        <Searchbar className="flex-grow md:flex-grow-0" />
      </div>
      {loading ? (
        <Loading>users</Loading>
      ) : (
        <UsersTable data={data} thead={["Username", "Position", "Settings"]} />
      )}
      {totalPages > 0 && (
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          onSetCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default Users;

import { useEffect, useState } from "react";
import { getUsers } from "../../apis/usersAPI";

import Searchbar from "../../components/Searchbar";
import Loading from "../../components/Loading/Loading";
import PaginationBar from "../../components/PaginationBar/PaginationBar";
import UsersTable from "./UsersTable";
import useDebounce from "../../hooks/useDebounce";

const Users = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchUser = useDebounce(searchValue, 1000);


  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const fetchUsers = async (page = currentPage, limit = 5) => {
    try {
      setLoading(true);
      const response = await getUsers(page, limit, debouncedSearchUser);
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
  }, [currentPage, debouncedSearchUser]);

  return (
    <>
      <div className="flex w-full">
        <Searchbar
          onSubmit={onSubmit}
          onSearchValue={handleSearch}
          searchValue={searchValue}
          className="flex-grow md:flex-grow-0"
        />
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

import { useEffect, useState } from "react";
import { getMovies } from "../../apis/moviesAPI";
import useDebounce from "../../hooks/useDebounce";

import Searchbar from "../../components/Searchbar";
import MovieItem from "./MovieItem";
import PaginationBar from "../../components/PaginationBar/PaginationBar";
import Loading from "../../components/Loading/Loading";
import NoResult from "../../components/NoResult/NoResult";
import Button from "../../components/Button/Button";
import { FilePlus } from "lucide-react";

const Movies = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [initialFetch, setInitialFetch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(8);

  const lastIndex = currentPage * moviesPerPage;
  const firstIndex = lastIndex - moviesPerPage;
  const currentMoviesPage = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / moviesPerPage);

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setInitialFetch(true);
      const response = await getMovies(debouncedSearchValue);
      setData(response);
    } catch (error) {
      setLoading(false);
      throw new Error(error.message);
    } finally {
      setLoading(false);
      setInitialFetch(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const searchResult = data.filter((item) => {
    return item?.tenPhim
      .trim()
      .toLowerCase()
      .includes(debouncedSearchValue.trim().toLowerCase());
  });

  useEffect(() => {
    fetchMovies();
  }, [debouncedSearchValue]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:767px)");
    const handleMediaQueryChange = (e) => setIsSmallScreen(e.matches);
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    if (!isSmallScreen) {
      setMoviesPerPage(8);
    } else {
      setMoviesPerPage(3);
    }
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [isSmallScreen]);

  return (
    <>
      <div className="flex w-full justify-between">
        <Searchbar
          onSubmit={handleSubmit}
          onSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          className="flex-grow md:flex-grow-0"
        />
        <Button size="icon" variant="ghost">
          <FilePlus />
        </Button>
      </div>
      {loading ? (
        <Loading>movies</Loading>
      ) : (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-2 overflow-y-auto lg:gap-4">
            {data &&
              currentMoviesPage.map((item) => (
                <MovieItem key={item.maPhim} {...item} />
              ))}
          </div>
          <div>
            <PaginationBar
              currentPage={currentPage}
              totalPages={npage}
              onSetCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
      {!searchResult.length && !initialFetch && <NoResult />}
    </>
  );
};

export default Movies;

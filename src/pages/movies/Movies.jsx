import { useEffect, useState } from "react";
import { getMovies } from "../../apis/moviesAPI";
import Searchbar from "../../components/Searchbar";
import MovieItem from "./MovieItem";
import PaginationBar from "../../components/PaginationBar/PaginationBar";

const Movies = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(3);

  const lastIndex = currentPage * moviesPerPage; // 1 * 5
  const firstIndex = lastIndex - moviesPerPage; // 5 -5
  const currentMoviesPage = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / moviesPerPage);

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      setData(response);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  console.log(currentMoviesPage);

  return (
    <>
      <div className="flex">
        <Searchbar className="flex-grow md:flex-grow-0" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-2 overflow-auto lg:gap-4">
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
  );
};

export default Movies;

import { useEffect, useState } from "react";
import { getMovies } from "../../apis/moviesAPI";
import Searchbar from "../../components/Searchbar";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [data, setData] = useState([]);

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
  }, []);

  console.log(data);
  return (
    <>
      <div className="flex">
        <Searchbar className="flex-grow md:flex-grow-0" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-2 overflow-auto lg:gap-4">
        {data && data.map((item) => <MovieItem key={item.maPhim} {...item} />)}
      </div>
    </>
  );
};

export default Movies;

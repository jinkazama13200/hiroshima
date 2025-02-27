import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../../apis/moviesAPI";
import MovieForm from "./MovieForm";
import Loading from "../../../components/Loading/Loading";
import Skeleton from "./Skeleton";

const EditMovie = () => {
  const { movieId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDataById = async () => {
    setLoading(true);
    try {
      const response = await getMovieById(movieId);
      setData(response);
    } catch (error) {
      throw new Error(error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!movieId) return;
    fetchDataById();
  }, [movieId]);

  return (
    <div className="flex w-full flex-col items-center justify-center p-2 lg:p-4">
      {loading ? <Skeleton /> : <MovieForm {...data} />}
    </div>
  );
};

export default EditMovie;

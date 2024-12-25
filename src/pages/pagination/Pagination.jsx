import { useState, useEffect, useRef } from "react";
import { getUsers } from "../../apis/usersAPI";
import { Home, LoaderCircle } from "lucide-react";
import GridItem from "../grid/GridItem";
import { useNavigate } from "react-router-dom";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const spinnerRef = useRef();
  const pageRef = useRef(1);

  const limit = 10;

  const navigate = useNavigate();

  const fetchData = async (page = pageRef.current, initialFetch) => {
    try {
      initialFetch && setLoading(true);
      const response = await getUsers(limit, (page - 1) * limit);
      if (Array.isArray(response?.items) && response?.items.length) {
        setData((prev) => {
          const newData = [...prev, ...response?.items];
          if (newData.length < response.totalCount) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
          return newData;
        });
      }
    } catch (error) {
      setLoading(false);
      throw new Error(error?.message);
    } finally {
      initialFetch && setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, true);
  }, []);

  useEffect(() => {
    const spinner = spinnerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      },
    );

    if (spinner) {
      observer.observe(spinner);
    }

    return () => {
      spinner && observer.unobserve(spinner);
    };
  }, [isSpinnerVisible]);

  useEffect(() => {
    if (isIntersecting) {
      fetchData(pageRef.current + 1);
    }
  }, [isIntersecting]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      {loading ? (
        <div className="flex items-center justify-center">
          <LoaderCircle className="animate-spin" size={50} />
          Loading ...
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-3">
          {data &&
            data.map((item, index) => {
              return <GridItem key={index} {...item} index={index} />;
            })}
        </div>
      )}
      {hasMore && (
        <div
          ref={(el) => {
            spinnerRef.current = el;
            setIsSpinnerVisible((prev) => !prev);
          }}
          className="my-5 flex items-center justify-center"
        >
          <LoaderCircle className="animate-spin" size={50} />
          Loading more ...
        </div>
      )}
      <div className="fixed bottom-10 right-10 flex flex-col gap-2">
        <div className="flex size-14 items-center justify-center rounded-full bg-red-500 text-white">
          {data.length}
        </div>
        <div
          onClick={() => navigate("/")}
          className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white"
        >
          <Home />
        </div>
      </div>
    </div>
  );
};

export default Pagination;

import { useEffect, useRef, useState } from "react";
import { getUsers } from "../../apis/usersAPI";
import GridItem from "./GridItem";
import { LoaderCircleIcon } from "lucide-react";

const Grid = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [data, setData] = useState([]);

  const limit = 20;

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getUsers(limit, (page - 1) * limit);
      if (Array.isArray(response.items)) {
        setData((prev) => [...prev, ...response.items]);
      }
    } catch (error) {
      setLoading(false);
      throw new Error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isIntersecting, setIsIntersecting] = useState(false);
  const spinnerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { root: null, rootMargin: "0px", threshold: 1 },
    );

    if (spinnerRef.current) {
      observer.observe(spinnerRef.current);
    }

    return () => {
      observer.unobserve(spinnerRef.current);
    };
  }, [spinnerRef]);

  console.log(isIntersecting);

  return (
    <div className="flex gap-4">
      <div className="sticky top-0 min-h-screen overflow-y-auto border-r border-gray-200 px-4 py-2">
        sidebar
      </div>
      <div className="sticky top-0 w-full overflow-y-auto px-4 py-2">
        {loading ? (
          <div className="flex w-full justify-center">
            <LoaderCircleIcon className="animate-spin" size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2">
            {data &&
              data.map((item, index) => (
                <GridItem index={index} key={item.taiKhoan} {...item} />
              ))}
          </div>
        )}
        <div
          ref={spinnerRef}
          className="flex items-center justify-center gap-2 p-5"
        >
          <LoaderCircleIcon className="animate-spin" />
          load more...
        </div>
      </div>
    </div>
  );
};

export default Grid;

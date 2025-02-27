import fetcher from "./fetcher";

export const getMovies = async (searchValue) => {
  try {
    const response = await fetcher.get("/api/QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP13",
        tenPhim: searchValue || undefined,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMovieById = async (movieId) => {
  try {
    const response = await fetcher.get("/api/QuanLyPhim/LayThongTinPhim", {
      params: {
        MaPhim: movieId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateMovie = async (payload) => {
  try {
    const response = await fetcher.post(
      "/api/QuanLyPhim/CapNhatPhimUpload",
      payload,
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

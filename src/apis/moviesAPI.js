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

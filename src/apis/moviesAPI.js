import fetcher from "./fetcher";

export const getMovies = async () => {
  try {
    const response = await fetcher.get("/api/QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP13",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};  

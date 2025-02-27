import fetcher from "./fetcher";

export const userSignIn = async (data) => {
  try {
    const response = await fetcher.post("/api/QuanLyNguoiDung/DangNhap", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getUsers = async (page, limit, searchValue) => {
  try {
    const response = await fetcher.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang`,
      {
        params: {
          soTrang: page,
          soPhanTuTrenTrang: limit,
          tuKhoa: searchValue || undefined,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

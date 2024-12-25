import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://movie0706.cybersoft.edu.vn",
});

fetcher.interceptors.request.use((request) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    request.headers.Authorization = `Bearer ${user?.accessToken}`;
  }
  return request;
});

fetcher.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("currentUser");
      window.location.replace("/");
    }
    return Promise.reject(error);
  },
);

export default fetcher;

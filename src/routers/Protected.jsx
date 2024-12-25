import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const Protected = ({ children }) => {
  const { currentUser } = useUserContext();
  if (!currentUser || currentUser.maLoaiNguoiDung !== "QuanTri") {
    localStorage.removeItem("currentUser");
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};

export default Protected;

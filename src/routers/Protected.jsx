import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const Protected = ({ children }) => {
  const { currentUser } = useUserContext();
  if (!currentUser || currentUser.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" />;
  }

  return children || <Outlet />;
};

export default Protected;

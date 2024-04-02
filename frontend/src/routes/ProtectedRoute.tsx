import { FC } from "react";
import { useAppSelector } from "../redux/store/Store";
import { Navigate,Outlet } from "react-router-dom";

const ProtectedRoute: FC = () => {
    const { isAuthenticated, role } = useAppSelector((state) => state.UserSlice);
  
    return isAuthenticated && role === "user" ? (
      <Outlet />
    ) : (
      <Navigate to={"/user/login"} replace />
    );
  };

  
  export default ProtectedRoute;
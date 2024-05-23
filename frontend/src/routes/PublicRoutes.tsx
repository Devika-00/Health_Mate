import { FC } from "react";
import { useAppSelector } from "../redux/store/Store";
import { Navigate, Outlet } from "react-router-dom";


const PublicRouteUser: FC = () => {
    const { isAuthenticated, role } = useAppSelector((state) => state.UserSlice );
    if (role === "user") {
      return isAuthenticated ? <Navigate to={"/"} replace /> : <Outlet />;
    }
    return <Outlet/>
  }

  export const PublicRouteDoctor: FC = () => {
    const { isAuthenticated, role } = useAppSelector((state) => state.DoctorSlice );
    if (role === "doctor") {
      return isAuthenticated ? <Navigate to={"/doctor"} replace /> : <Outlet />;
    }
    return <Outlet/>
  }

  export const PublicRouteAdmin: FC = () => {
    const { isAuthenticated, role } = useAppSelector((state) => state.AdminSlice );
    if (role === "admin") {
      return isAuthenticated ? <Navigate to={"/admin"} replace /> : <Outlet />;
    }
    return <Outlet/>
  }
 // if user has no role and not authenticated return the routes
  
  export default PublicRouteUser;


import AdminRoutes from "./AdminRoute";
import PublicRoutes from "./PublicRoute";
import { useAppDispatch, useAppSelector } from "../provider/hooks";
import { useEffect } from "react";
import { storageKeys } from "../utils/constants/localStorage";
import { setUser } from "../provider/slices/userSlice";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const userData = localStorage.getItem(storageKeys.userData);
    if (userData) {
      dispatch(setUser(JSON.parse(userData)));
    }
  }, []);

  const isLoggedIn: Boolean = user?.isLoggedIn;

  return isLoggedIn ? <AdminRoutes /> : <PublicRoutes />;
};

export default AppRouter;

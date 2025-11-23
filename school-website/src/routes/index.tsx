import AdminRoutes from "./AdminRoute";
import PublicRoutes from "./PublicRoute";
import { useAppSelector } from "../provider/hooks";

const AppRouter = () => {
  const user = useAppSelector((state) => state.user);

  const isLoggedIn: Boolean = user?.isLoggedIn;

  return isLoggedIn ? <AdminRoutes /> : <PublicRoutes />;
};

export default AppRouter;

import { Navigate } from "react-router-dom";

import LoadingBar from "@/components/LoadingBar";
import { useAuthHandler } from "@/hooks/useAuthChecker";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetAdminPanelReachable } from "@/pages/app/hooks/admin/useAdmin";
import { setAdminAuthenticated } from "@/reducers/adminReducer";

export interface AuthProtectorProps {
  children: React.ReactNode;
}
const AdminAuthLayout = ({ children }: AuthProtectorProps) => {
  const dispatch = useDispatch();

  const { isError, isPending, data } = useAuthHandler();

  const {
    isError: reachError,
    isSuccess: reachSuccess,
    error: reachErrorData,
  } = useGetAdminPanelReachable();

  useEffect(() => {
    if (reachSuccess) {
      dispatch(setAdminAuthenticated(true));
    }

    if (reachError) {
      dispatch(setAdminAuthenticated(false));
    }
  }, [reachSuccess, reachError, reachErrorData]);

  if (isPending) return <LoadingBar />;

  if (isError) return <Navigate to="/" />;

  if (data.role !== "admin") return <Navigate to="/" />;

  return <>{children}</>;
};

export default AdminAuthLayout;

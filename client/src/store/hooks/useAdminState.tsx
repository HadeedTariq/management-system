import { StoreState } from "@/store/store";
import { useSelector } from "react-redux";

export const useAdminState = () => {
  const adminState = useSelector((state: StoreState) => state.adminReducer);
  return { ...adminState };
};

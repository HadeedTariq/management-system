import adminReducer, { AdminState } from "@/reducers/adminReducer";
import fullAppReducer, { FullAppState } from "@/reducers/fullAppReducer";

import { configureStore } from "@reduxjs/toolkit";

export interface StoreState {
  fullAppReducer: FullAppState;
  adminReducer: AdminState;
}

export const store = configureStore({
  reducer: {
    fullAppReducer: fullAppReducer,
    adminReducer: adminReducer,
  },
});

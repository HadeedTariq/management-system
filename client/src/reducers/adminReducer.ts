import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AdminState = {
  adminAuthenticated: boolean;
};

const initialState: AdminState = {
  adminAuthenticated: false,
};

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    setAdminAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.adminAuthenticated = action.payload;
    },
  },
});

export const { setAdminAuthenticated } = adminReducer.actions;
export default adminReducer.reducer;

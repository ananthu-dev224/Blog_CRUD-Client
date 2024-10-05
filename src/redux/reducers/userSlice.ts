import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (
      state: any,
      action: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    userLogout: (state: any) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {userLogin,userLogout} = userSlice.actions;
export default userSlice.reducer;
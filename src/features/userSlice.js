import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    slide: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setSlide: (state) => {
      state.slide = !state.slide;
    },
  },
});

export const { login, logout, setSlide } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectSlide = (state) => state.user.slide;

export default userSlice.reducer;

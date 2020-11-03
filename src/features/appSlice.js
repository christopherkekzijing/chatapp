import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    channelId: null,
    channelName: null,
    channelOwner: null,
  },
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
      state.channelOwner = action.payload.channelOwner;
    },
  },
});

export const { setChannelInfo } = appSlice.actions;
export const selectchannelId = (state) => state.app.channelId;
export const selectchannelName = (state) => state.app.channelName;
export const selectchannelOwner = (state) => state.app.channelOwner;

export default appSlice.reducer;

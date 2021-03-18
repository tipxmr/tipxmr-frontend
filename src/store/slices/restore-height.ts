import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface RestoreHeightState {}
type RestoreHeightState = number;

const slice = createSlice({
  name: "restoreHeight",
  initialState: 0 as RestoreHeightState,
  reducers: {
    update: (state, action: PayloadAction<number>) => {
      state = action.payload;
    },
  },
});

export const { actions, reducer } = slice;

export default slice;
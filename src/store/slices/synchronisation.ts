import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SynchronisationState {
    isActive: boolean;
    isDone: boolean;
    progress: number;
}

const slice = createSlice({
  name: "synchronisation",
  initialState: {
      isActive: false,
      isDone: false,
      progress: 0
  } as SynchronisationState,
  reducers: {
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setIsDone: (state, action: PayloadAction<boolean>) => {
      state.isDone = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
  },
});

export const { actions, reducer } = slice;

export default slice;
